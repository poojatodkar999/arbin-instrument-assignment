import { useForm } from 'react-hook-form';
import styles from './StationForm.module.css';

export default function StationForm({ defaultValues, onSubmit, isSubmitting, title, onCancel }) {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: defaultValues || {
            stationName: '',
            locationAddress: '',
            pinCode: '',
            connectorType: '',
            status: 'Operational',
            imageUrl: '',
            locationLink: ''
        }
    });

    const imageUrlValue = watch('imageUrl');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('imageUrl', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                <div className={styles.gridContainer}>
                    {/* Station Name */}
                    <div className={styles.field}>
                        <label htmlFor="stationName" className={styles.label}>Station Name</label>
                        <input
                            id="stationName"
                            {...register('stationName', { required: 'Station name is required' })}
                            className={styles.input}
                            placeholder="e.g. EV Station Pune"
                        />
                        {errors.stationName && <span className={styles.error}>{errors.stationName.message}</span>}
                    </div>

                    {/* Status - Radio Buttons */}
                    <div className={styles.field}>
                        <label className={styles.label}>Status</label>
                        <div className={styles.radioGroup}>
                            <label className={`${styles.radioLabel} ${styles.radioOp}`}>
                                <input
                                    type="radio"
                                    value="Operational"
                                    {...register('status', { required: true })}
                                />
                                Operational
                            </label>
                            <label className={`${styles.radioLabel} ${styles.radioMain}`}>
                                <input
                                    type="radio"
                                    value="Maintenance"
                                    {...register('status', { required: true })}
                                />
                                Maintenance
                            </label>
                        </div>
                        {errors.status && <span className={styles.error}>{errors.status.message}</span>}
                    </div>

                    {/* Address - Full Width */}
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label htmlFor="locationAddress" className={styles.label}>Address</label>
                        <input
                            id="locationAddress"
                            {...register('locationAddress', { required: 'Address is required' })}
                            className={styles.input}
                            placeholder="e.g. Baner Road, Pune"
                        />
                        {errors.locationAddress && <span className={styles.error}>{errors.locationAddress.message}</span>}
                    </div>

                    {/* Pin Code */}
                    <div className={styles.field}>
                        <label htmlFor="pinCode" className={styles.label}>Pin Code</label>
                        <input
                            id="pinCode"
                            {...register('pinCode', { required: 'Pin code is required' })}
                            className={styles.input}
                            placeholder="e.g. 411045"
                        />
                        {errors.pinCode && <span className={styles.error}>{errors.pinCode.message}</span>}
                    </div>

                    {/* Connector Type */}
                    <div className={styles.field}>
                        <label htmlFor="connectorType" className={styles.label}>Connector Type</label>
                        <input
                            id="connectorType"
                            {...register('connectorType', { required: 'Connector type is required' })}
                            className={styles.input}
                            placeholder="e.g. Type 2"
                        />
                        {errors.connectorType && <span className={styles.error}>{errors.connectorType.message}</span>}
                    </div>

                    {/* Location Link - Full Width */}
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label htmlFor="locationLink" className={styles.label}>Map Link (URL)</label>
                        <input
                            id="locationLink"
                            type="url"
                            {...register('locationLink', {
                                required: 'Map link is required',
                                pattern: {
                                    value: /^https?:\/\/.+/,
                                    message: 'Please enter a valid URL'
                                }
                            })}
                            className={styles.input}
                            placeholder="https://maps.google.com..."
                        />
                        {errors.locationLink && <span className={styles.error}>{errors.locationLink.message}</span>}
                    </div>

                    {/* Image Upload - Full Width */}
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label htmlFor="imageUpload" className={styles.label}>Station Image</label>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className={styles.fileInput}
                            />
                            {imageUrlValue && (
                                <div style={{ width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                    <img src={imageUrlValue} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            )}
                        </div>

                        <input
                            id="imageUrl"
                            {...register('imageUrl', { required: 'Image is required (upload or enter URL)' })}
                            className={styles.input}
                            placeholder="Or enter Image URL..."
                            style={{ marginTop: '0.5rem' }}
                        />
                        {errors.imageUrl && <span className={styles.error}>{errors.imageUrl.message}</span>}
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={onCancel}
                        className={styles.cancelButton}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.submitButton}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Station'}
                    </button>
                </div>
            </form>
        </div>
    );
}
