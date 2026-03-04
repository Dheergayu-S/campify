import Navbar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>© 2026 Smart Campus Finder | BCA Final Year Project</p>
      </footer>
    </div>
  );
};

export default Layout;
