import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    // Check if user is logged in
    const token = localStorage.getItem('token');

    // Check if user is admin
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const isAdmin = user?.user_name === 'admin';

    // If not logged in & on login page, don't show navbar contents (optional, but cleaner)
    if (!token && location.pathname === '/login') return null;

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    StationMonitor
                </div>
                <div className={styles.links}>
                    <Link
                        to="/dashboard"
                        className={`${styles.link} ${location.pathname === '/dashboard' ? styles.active : ''}`}
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>

                    {isAdmin && (
                        <Link
                            to="/admin/stations"
                            className={`${styles.link} ${location.pathname.startsWith('/admin') ? styles.active : ''}`}
                        >
                            <PlusCircle size={20} />
                            <span>Admin List</span>
                        </Link>
                    )}

                    <button onClick={handleLogout} className={`${styles.link} ${styles.logoutBtn}`}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
