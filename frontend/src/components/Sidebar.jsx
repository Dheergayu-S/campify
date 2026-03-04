import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiSearch, FiMail, FiLogIn, FiLogOut, FiUser, FiSettings, FiHeart } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { logoutUser } from '../services/api';
import './Sidebar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    window.location.reload();
  };

  const menuItems = [
    { path: '/', icon: <FiHome />, label: 'Home' },
    { path: '/explore', icon: <FiSearch />, label: 'Explore' },
    { path: '/contact', icon: <FiMail />, label: 'Contact Us' },
  ];

  if (user && user.role === 'admin') {
    menuItems.push({ path: '/admin', icon: <FiSettings />, label: 'Admin' });
  }

  if (user) {
    menuItems.push({ path: '/wishlist', icon: <FiHeart />, label: 'Wishlist' });
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-icon"><HiOutlineAcademicCap /></span>
          <span className="logo-text">StudySeekers</span>
        </NavLink>
        
        <nav className="nav-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}

          {user ? (
            <div className="nav-auth">
              <span className="nav-user">
                <FiUser className="nav-icon" />
                <span className="nav-label">{user.name}</span>
              </span>
              <button className="nav-logout" onClick={handleLogout}>
                <FiLogOut />
                <span className="nav-label">Logout</span>
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => 
                `nav-item nav-login ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon"><FiLogIn /></span>
              <span className="nav-label">Login</span>
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
