import { useState } from 'react';
import { MapPin, Activity, Image as ImageIcon } from 'lucide-react';
import styles from './StationCard.module.css';

export default function StationCard({ station }) {
    const [imgError, setImgError] = useState(false);
    const isOperational = station.status === 'Operational';

    return (
        <div className={`${styles.card} ${isOperational ? styles.operational : styles.maintenance}`}>
            {station.imageUrl && !imgError ? (
                <div className={styles.imageContainer}>
                    <img
                        src={station.imageUrl}
                        alt={station.stationName}
                        className={styles.image}
                        onError={() => setImgError(true)}
                    />
                </div>
            ) : station.imageUrl && imgError ? (
                <div className={`${styles.imageContainer} ${styles.imageError}`}>
                    <ImageIcon size={48} className={styles.placeholderIcon} />
                    <span style={{ fontSize: '0.8rem' }}>Invalid Image Data</span>
                </div>
            ) : null}

            <div className={styles.header}>
                <div className={styles.nameContainer}>
                    <h3 className={styles.name}>{station.stationName}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className={`${styles.statusBadge} ${isOperational ? styles.statusOp : styles.statusMain}`}>
                            {isOperational ? <Activity size={14} /> : <Activity size={14} />}
                            {station.status}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginLeft: '1rem' }}>
                            {station.connectorType}
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.body}>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    {station.locationAddress} - {station.pinCode}
                </p>

                <a
                    href={station.locationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.locationLink}
                >
                    <MapPin size={16} />
                    View Map
                </a>


            </div>
        </div>
    );

}
