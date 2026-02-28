import { Link } from 'react-router-dom';
import { FiSearch, FiBarChart2, FiMessageCircle } from 'react-icons/fi';
import { HiOutlineOfficeBuilding, HiOutlineBookOpen, HiOutlineCollection, HiOutlineLocationMarker } from 'react-icons/hi';
import './Home.css';

const Home = () => {
  const stats = [
    { icon: <HiOutlineOfficeBuilding />, value: '41', label: 'Colleges' },
    { icon: <HiOutlineBookOpen />, value: '150+', label: 'Courses' },
    { icon: <HiOutlineCollection />, value: '6', label: 'Streams' },
    { icon: <HiOutlineLocationMarker />, value: 'Mysore', label: 'Region' },
  ];

  const featuredColleges = [
    { id: 31, name: 'SJCE (JSS S&T University)', type: 'Engineering' },
    { id: 32, name: 'NIE Mysore', type: 'Engineering' },
    { id: 1, name: "Maharaja's College", type: 'Arts / Commerce' },
    { id: 41, name: 'Bharath Matha FGC', type: 'Computer Applications' },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to <span className="highlight">Smart Campus Finder</span></h1>
        <p>Discover the perfect college for your future in Mysore region</p>
        <Link to="/explore" className="cta-button">
          <FiSearch style={{ marginRight: '8px' }} /> Explore Colleges
        </Link>
      </section>
      {/* Stats Section */}
      <section className="stats-section">
        <h2>At a Glance</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="featured-section">
        <h2>Featured Colleges</h2>
        <div className="featured-grid">
          {featuredColleges.map((college) => (
            <div key={college.id} className="featured-card">
              <h3>{college.name}</h3>
              <span className="college-type">{college.type}</span>
              <Link to="/explore" className="view-btn">View Details →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/explore" className="action-card">
            <span className="action-icon"><FiSearch /></span>
            <span>Search Colleges</span>
          </Link>
          <Link to="/explore" className="action-card">
            <span className="action-icon"><FiBarChart2 /></span>
            <span>Compare Colleges</span>
          </Link>
          <Link to="/contact" className="action-card">
            <span className="action-icon"><FiMessageCircle /></span>
            <span>Get Help</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
