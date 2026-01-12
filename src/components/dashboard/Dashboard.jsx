import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StationService } from '../../services/StationService';
import StationCard from './StationCard';
import styles from './Dashboard.module.css';

export default function Dashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());

    const { data: stations, isLoading, error } = useQuery({
        queryKey: ['stations'],
        queryFn: () => StationService.getAll(),
        refetchInterval: 1000,
    });

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (isLoading) return <div className={styles.loading}>Loading stations...</div>;
    if (error) return <div className={styles.error}>Error loading stations</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Station Overview</h1>
                    <p className={styles.subtitle}>Real-time monitoring of all charging stations</p>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                        {currentTime.toLocaleTimeString()}
                    </div>
                    <div style={{
                        fontSize: '0.85rem',
                        color: 'var(--color-primary)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        display: 'inline-block'
                    }}>
                        Auto-refresh: 1s
                    </div>
                </div>
            </div>

            <div className={styles.grid}>
                {stations.map(station => (
                    <StationCard key={station.stationId} station={station} />
                ))}
            </div>
        </div>
    );
}
