import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineOfficeBuilding, HiOutlineBookOpen, HiOutlineCollection, HiOutlineLocationMarker } from 'react-icons/hi';
import iiscHero from '../assets/IISc.webp';
import './Home.css';

const Home = () => {
 

  const stats = [
    { icon: <HiOutlineOfficeBuilding />, value: '41', label: 'Colleges' },
    { icon: <HiOutlineBookOpen />, value: '10', label: 'Courses' },
    { icon: <HiOutlineCollection />, value: '6', label: 'Streams' },
    { icon: <HiOutlineLocationMarker />, value: 'Southern Karnataka', sublabel: '(currently Mysore)', label: 'Region' },
  ];

  const featuredColleges = [
    { id: 31, name: 'SJCE (JSS S&T University)', type: 'Engineering' },
    { id: 32, name: 'NIE Mysore', type: 'Engineering' },
    { id: 1, name: "Maharaja's College", type: 'Arts / Commerce' },
    { id: 41, name: 'Bharath Matha FGC', type: 'Computer Applications' },
  ];

  return (
    <div className="home page">
      {/* Hero Section */}
      <section className="hero card">
        <img
          src={iiscHero}
          alt="IISc campus"
          style={{
            width: 'min(100%, 760px)',
            height: 'auto',
            display: 'block',
            margin: '0 auto 22px',
            borderRadius: '12px',
            border: '1px solid var(--border)'
          }}
        />
        <h1>Welcome to <span className="highlight">StudySeekers</span></h1>
        <p>Find the right college across Southern Karnataka — all in one place</p>
        <Link to="/explore" className="cta-button btn">
          <FiSearch style={{ marginRight: '8px' }} /> Explore Colleges
        </Link>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <h2>Overview</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card card">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-value">{stat.value}</span>
              {stat.sublabel && <span className="stat-sublabel">{stat.sublabel}</span>}
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
            <div key={college.id} className="featured-card card">
              <h3>{college.name}</h3>
              <span className="college-type">{college.type}</span>
              <Link to="/explore" className="view-btn">View Details →</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
