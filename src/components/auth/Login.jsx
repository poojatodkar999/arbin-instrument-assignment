import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setLoginError('');

        try {
            // Note: Using absolute URL based on user prompt, or relative if proxied/configured in api.js.
            // Since api.js has baseURL, we can use that if the endpoint matches.
            // User specified: https://localhost:7269/UserProcessor/getGenerateToken

            // Constructing payload as per requirement
            const payload = {
                user_name: data.username,
                password: data.password
            };

            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}UserProcessor/getGenerateToken`,
                payload
            );

            if (response.data && response.data.token) {
                // Store token
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data));

                // Redirect
                navigate('/dashboard');
            } else {
                setLoginError('Invalid response from server.');
            }

        } catch (error) {
            console.error('Login error:', error);
            const msg = error.response?.status === 401
                ? 'Invalid username or password.'
                : 'Login failed. Please try again.';
            setLoginError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Sign in to manage your stations</p>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    {loginError && <div className={styles.error}>{loginError}</div>}

                    <div className={styles.field}>
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <input
                            id="username"
                            {...register('username', { required: 'Username is required' })}
                            className={styles.input}
                            placeholder="Enter your username"
                        />
                        {errors.username && <span style={{ color: 'red', fontSize: '0.8em' }}>{errors.username.message}</span>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className={styles.input}
                            placeholder="••••••••"
                        />
                        {errors.password && <span style={{ color: 'red', fontSize: '0.8em' }}>{errors.password.message}</span>}
                    </div>

                    <button type="submit" className={styles.button} disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
