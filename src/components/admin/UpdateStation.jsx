import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StationService } from '../../services/StationService';
import StationForm from './StationForm';

export default function UpdateStation() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Fetch specific station by ID
    const { data: station, isLoading } = useQuery({
        queryKey: ['stations', id],
        queryFn: () => StationService.getById(id),
        enabled: !!id // Only run if ID exists
    });

    // const station = stations?.find(s => s.stationId === id);

    const mutation = useMutation({
        mutationFn: (updates) => StationService.update(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries(['stations']);
            navigate('/dashboard');
        },
    });

    if (isLoading) return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Loading...</div>;
    if (!station) return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Station not found</div>;

    return (
        <StationForm
            title="Edit Station"
            defaultValues={station}
            isSubmitting={mutation.isPending}
            onSubmit={(data) => mutation.mutate(data)}
        />
    );
}
