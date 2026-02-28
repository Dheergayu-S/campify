import { NavLink } from 'react-router-dom';
import { FiHome, FiSearch, FiMail } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import './Sidebar.css';

const Navbar = () => {
  const menuItems = [
    { path: '/', icon: <FiHome />, label: 'Home' },
    { path: '/explore', icon: <FiSearch />, label: 'Explore' },
    { path: '/contact', icon: <FiMail />, label: 'Contact Us' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-icon"><HiOutlineAcademicCap /></span>
          <span className="logo-text">Smart Campus</span>
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
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
