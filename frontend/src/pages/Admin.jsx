import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiBook, FiBarChart2, FiGlobe } from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import {
  getAdminStats, getCampuses, addCollege, updateCollege, deleteCollege,
  addCourse, updateCourse, deleteCourse, getAdminUsers, updateUser, deleteUser
} from '../services/api';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [colleges, setColleges] = useState([]);
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState({ text: '', type: '' });

  // College form
  const [cf, setCf] = useState({ name: '', location: '', website: '' });
  const [editCId, setEditCId] = useState(null);

  // Course form
  const [cof, setCof] = useState({ name: '', campus_id: '', fees: '', eligibility: '', stream: '' });
  const [editCoId, setEditCoId] = useState(null);

  // User edit
  const [editUId, setEditUId] = useState(null);
  const [uf, setUf] = useState({ name: '', role: '' });

  const streams = ['Engineering', 'Science', 'Management', 'Computer Applications', 'Arts / Commerce', 'Specialized'];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'admin') { navigate('/login'); return; }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [s, c, u] = await Promise.all([getAdminStats(), getCampuses(), getAdminUsers()]);
      setStats(s);
      setColleges(c);
      setUsers(u);
    } catch (err) {
      console.error('Admin load error:', err);
      if (err.response?.status === 401) {
        // Token expired — re-login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setMsg({ text: 'Failed to load data. Check if backend is running.', type: 'error' });
      }
    }
  };

  const flash = (text, type = 'success') => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: '', type: '' }), 3000);
  };

  // College handlers
  const handleCollegeSave = async (e) => {
    e.preventDefault();
    if (/[0-9]/.test(cf.name)) { flash('College name must not contain numbers', 'error'); return; }
    try {
      if (editCId) { await updateCollege(editCId, cf); flash('College updated'); }
      else { await addCollege(cf); flash('College added'); }
      setCf({ name: '', location: '', website: '' }); setEditCId(null); loadData();
    } catch (err) { flash(err.response?.data?.detail || 'Error', 'error'); }
  };

  const handleDeleteCollege = async (id, name) => {
    if (!confirm(`Delete "${name}" and all its courses?`)) return;
    try { await deleteCollege(id); flash(`"${name}" deleted`); loadData(); }
    catch { flash('Delete failed', 'error'); }
  };

  // Course handlers
  const handleCourseSave = async (e) => {
    e.preventDefault();
    const feesNum = parseInt(cof.fees);
    if (feesNum > 1000000) { flash('Fees cannot exceed ₹10,00,000 (10 lakhs)', 'error'); return; }
    if (feesNum < 0) { flash('Fees cannot be negative', 'error'); return; }
    try {
      const data = { ...cof, campus_id: parseInt(cof.campus_id), fees: feesNum };
      if (editCoId) { await updateCourse(editCoId, data); flash('Course updated'); }
      else { await addCourse(data); flash('Course added'); }
      setCof({ name: '', campus_id: '', fees: '', eligibility: '', stream: '' }); setEditCoId(null); loadData();
    } catch (err) { flash(err.response?.data?.detail || 'Error', 'error'); }
  };

  const handleDeleteCourse = async (courseId, name) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try { await deleteCourse(courseId); flash(`"${name}" deleted`); loadData(); }
    catch { flash('Delete failed', 'error'); }
  };

  // User handlers
  const handleUserSave = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editUId, uf);
      flash('User updated');
      setEditUId(null); setUf({ name: '', role: '' }); loadData();
    } catch (err) { flash(err.response?.data?.detail || 'Error', 'error'); }
  };

  const handleDeleteUser = async (id, name) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    try { await deleteUser(id); flash(`"${name}" deleted`); loadData(); }
    catch (err) { flash(err.response?.data?.detail || 'Delete failed', 'error'); }
  };

  return (
    <div className="admin page">
      <div className="admin-header page-header">
        <h1>Admin Panel</h1>
        <p>Manage colleges, courses, and users</p>
      </div>

      {msg.text && <div className={`admin-msg ${msg.type}`}>{msg.text}</div>}

      <div className="admin-tabs">
        {[
          { key: 'dashboard', icon: <FiBarChart2 />, label: 'Dashboard' },
          { key: 'colleges', icon: <HiOutlineOfficeBuilding />, label: 'Colleges' },
          { key: 'courses', icon: <FiBook />, label: 'Courses' },
          { key: 'users', icon: <FiUsers />, label: 'Users' },
        ].map(t => (
          <button key={t.key} className={tab === t.key ? 'active' : ''} onClick={() => setTab(t.key)}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {tab === 'dashboard' && (
        <div className="admin-stats">
          <div className="stat-card"><HiOutlineOfficeBuilding size={28} /><div className="val">{stats.total_colleges || 0}</div><div className="lbl">Colleges</div></div>
          <div className="stat-card"><FiBook size={28} /><div className="val">{stats.total_courses || 0}</div><div className="lbl">Courses</div></div>
          <div className="stat-card"><FiUsers size={28} /><div className="val">{stats.total_users || 0}</div><div className="lbl">Users</div></div>
        </div>
      )}

      {/* Colleges */}
      {tab === 'colleges' && (
        <div className="admin-section">
          <form onSubmit={handleCollegeSave} className="admin-form card">
            <h3>{editCId ? 'Edit College' : 'Add New College'}</h3>
            <input type="text" placeholder="College name" value={cf.name} onChange={e => setCf({ ...cf, name: e.target.value })} required />
            <input type="text" placeholder="Location" value={cf.location} onChange={e => setCf({ ...cf, location: e.target.value })} required />
            <input type="url" placeholder="Website URL (e.g. https://college.edu)" value={cf.website} onChange={e => setCf({ ...cf, website: e.target.value })} />
            <div className="form-actions">
              <button type="submit" className="btn-primary btn"><FiPlus /> {editCId ? 'Update' : 'Add'}</button>
              {editCId && <button type="button" className="btn-secondary" onClick={() => { setEditCId(null); setCf({ name: '', location: '', website: '' }); }}>Cancel</button>}
            </div>
          </form>
          <div className="admin-table card"><table>
            <thead><tr><th>ID</th><th>Name</th><th>Location</th><th>Website</th><th>Actions</th></tr></thead>
            <tbody>{colleges.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td><td>{c.name}</td><td>{c.location}</td>
                <td>{c.website ? <a href={c.website} target="_blank" rel="noopener noreferrer" style={{ color: '#635bff', display: 'flex', alignItems: 'center', gap: '4px' }}><FiGlobe size={14} /> Visit</a> : '—'}</td>
                <td className="actions">
                  <button className="btn-icon edit" onClick={() => { setCf({ name: c.name, location: c.location, website: c.website || '' }); setEditCId(c.id); }}><FiEdit2 /></button>
                  <button className="btn-icon delete" onClick={() => handleDeleteCollege(c.id, c.name)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}</tbody>
          </table></div>
        </div>
      )}

      {/* Courses */}
      {tab === 'courses' && (
        <div className="admin-section">
          <form onSubmit={handleCourseSave} className="admin-form card">
            <h3>{editCoId ? 'Edit Course' : 'Add New Course'}</h3>
            <select value={cof.campus_id} onChange={e => setCof({ ...cof, campus_id: e.target.value })} required>
              <option value="">Select College</option>
              {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input type="text" placeholder="Course name (BCA, B.Com...)" value={cof.name} onChange={e => setCof({ ...cof, name: e.target.value })} required />
            <input type="number" placeholder="Fees per year" value={cof.fees} onChange={e => setCof({ ...cof, fees: e.target.value })} required />
            <input type="text" placeholder="Eligibility" value={cof.eligibility} onChange={e => setCof({ ...cof, eligibility: e.target.value })} />
            <select value={cof.stream} onChange={e => setCof({ ...cof, stream: e.target.value })} required>
              <option value="">Select Stream</option>
              {streams.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="form-actions">
              <button type="submit" className="btn-primary btn"><FiPlus /> {editCoId ? 'Update' : 'Add'}</button>
              {editCoId && <button type="button" className="btn-secondary" onClick={() => { setEditCoId(null); setCof({ name: '', campus_id: '', fees: '', eligibility: '', stream: '' }); }}>Cancel</button>}
            </div>
          </form>
          <div className="admin-table card"><table>
            <thead><tr><th>College</th><th>Course</th><th>Fees</th><th>Stream</th><th>Actions</th></tr></thead>
            <tbody>{colleges.flatMap(c =>
              (c.courses || []).map(co => (
                <tr key={co.id}>
                  <td>{c.name}</td><td>{co.name}</td><td>₹{co.fees?.toLocaleString()}</td><td>{co.stream}</td>
                  <td className="actions">
                    <button className="btn-icon edit" onClick={() => { setCof({ name: co.name, campus_id: c.id, fees: co.fees, eligibility: co.eligibility || '', stream: co.stream || '' }); setEditCoId(co.id); }}><FiEdit2 /></button>
                    <button className="btn-icon delete" onClick={() => handleDeleteCourse(co.id, co.name)}><FiTrash2 /></button>
                  </td>
                </tr>
              ))
            )}</tbody>
          </table></div>
        </div>
      )}

      {/* Users */}
      {tab === 'users' && (
        <div className="admin-section">
          {editUId && (
            <form onSubmit={handleUserSave} className="admin-form card">
              <h3>Edit User</h3>
              <input type="text" placeholder="Name" value={uf.name} onChange={e => setUf({ ...uf, name: e.target.value })} required />
              <select value={uf.role} onChange={e => setUf({ ...uf, role: e.target.value })} required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="form-actions">
                <button type="submit" className="btn-primary btn"><FiEdit2 /> Update</button>
                <button type="button" className="btn-secondary" onClick={() => { setEditUId(null); setUf({ name: '', role: '' }); }}>Cancel</button>
              </div>
            </form>
          )}
          <div className="admin-table card"><table>
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
            <tbody>{users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td>
                <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
                <td className="actions">
                  <button className="btn-icon edit" onClick={() => { setUf({ name: u.name, role: u.role }); setEditUId(u.id); }}><FiEdit2 /></button>
                  <button className="btn-icon delete" onClick={() => handleDeleteUser(u.id, u.name)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}</tbody>
          </table></div>
        </div>
      )}
    </div>
  );
};

export default Admin;
