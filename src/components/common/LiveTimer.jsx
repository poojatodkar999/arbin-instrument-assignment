import { useState, useEffect } from 'react';

export default function LiveTimer({ initialUptime }) {
    const [uptime, setUptime] = useState(initialUptime);

    useEffect(() => {
        setUptime(initialUptime); // Sync when prop changes

        const interval = setInterval(() => {
            setUptime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [initialUptime]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    return (
        <span>{formatTime(uptime)}</span>
    );
}
