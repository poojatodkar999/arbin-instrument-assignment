import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom'; // Import Navigate explicitly
import { StationService } from '../../services/StationService';
import styles from './AdminDashboard.module.css';
import Modal from '../common/Modal';
import StationForm from './StationForm';

// ... EditStationWrapper component remains unchanged ...
function EditStationWrapper({ id, onCancel, onSuccess }) {
    const { data: station, isLoading } = useQuery({
        queryKey: ['stations', id],
        queryFn: () => StationService.getById(id),
        enabled: !!id
    });

    const mutation = useMutation({
        mutationFn: (updates) => StationService.update(id, updates),
        onSuccess: () => {
            onSuccess();
        },
        onError: () => toast.error("Failed to update station")
    });

    if (isLoading) return <div>Loading station data...</div>;
    if (!station) return <div>Station not found</div>;

    return (
        <StationForm
            defaultValues={station}
            isSubmitting={mutation.isPending}
            onSubmit={(data) => mutation.mutate(data)}
            onCancel={onCancel}
        />
    );
}

export default function AdminDashboard() {
    // 1. Check for Admin Role Security immediately
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user || user.user_name !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedStationId, setSelectedStationId] = useState(null);

    // Fetch stations
    const { data: stations, isLoading, error } = useQuery({
        queryKey: ['stations'],
        queryFn: () => StationService.getAll()
    });

    // Create Mutation
    const createMutation = useMutation({
        mutationFn: (data) => StationService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['stations']);
            toast.success('Station created successfully!');
            handleCloseModal();
        },
        onError: () => toast.error("Failed to create station")
    });

    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => StationService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['stations']);
            toast.success('Station deleted successfully!');
        },
        onError: () => toast.error("Failed to delete station")
    });

    const handleCreateClick = () => {
        setModalMode('create');
        setSelectedStationId(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (id) => {
        setModalMode('edit');
        setSelectedStationId(id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this station?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedStationId(null);
    };

    if (isLoading) return <div className={styles.loading}>Loading management interface...</div>;
    if (error) return <div className={styles.error}>Error loading stations</div>;

    return (
        <div className={styles.container}>
            <Toaster position="top-right" />
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Station Management</h1>
                    <p className={styles.subtitle}>Create, update, or remove stations</p>
                </div>
                <button onClick={handleCreateClick} className={styles.addButton}>
                    <Plus size={20} />
                    Add Station
                </button>
            </header>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Station Name</th>
                            <th>Status</th>
                            <th>Location</th>
                            <th className={styles.actionsHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stations?.length === 0 ? (
                            <tr>
                                <td colSpan={4} className={styles.emptyState}>
                                    <AlertCircle size={20} />
                                    No stations found. Create one to get started.
                                </td>
                            </tr>
                        ) : (
                            stations?.map((station) => (
                                <tr key={station.stationId}>
                                    <td className={styles.nameCell}>{station.stationName}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${station.status === 'Operational' ? styles.statusOp : styles.statusMain}`}>
                                            {station.status}
                                        </span>
                                    </td>
                                    <td>
                                        <a href={station.locationLink} target="_blank" rel="noreferrer" className={styles.link}>
                                            View Map
                                        </a>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                onClick={() => handleEditClick(station.stationId)}
                                                className={styles.iconBtn}
                                                title="Edit"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(station.stationId)}
                                                className={`${styles.iconBtn} ${styles.deleteBtn}`}
                                                title="Delete"
                                                disabled={deleteMutation.isPending}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={modalMode === 'create' ? 'Create New Station' : 'Edit Station'}
            >
                {modalMode === 'create' ? (
                    <StationForm
                        onCancel={handleCloseModal}
                        isSubmitting={createMutation.isPending}
                        onSubmit={(data) => createMutation.mutate(data)}
                    />
                ) : (
                    <EditStationWrapper
                        id={selectedStationId}
                        onCancel={handleCloseModal}
                        onSuccess={() => {
                            queryClient.invalidateQueries(['stations']);
                            toast.success('Station updated successfully!');
                            handleCloseModal();
                        }}
                    />
                )}
            </Modal>
        </div>
    );
}
