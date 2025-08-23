import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const url = "http://localhost:5010/dashboard";

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setUsers(res.data);
          console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  // Deduplicate any repeated users to avoid duplicate cards (by _id, id, or email)
  const dedupedUsers = (() => {
    const seen = new Set();
    return users.filter((u) => {
      const key = u?._id ?? u?.id ?? u?.email ?? `${u?.firstName || ''}|${u?.lastName || ''}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  })();

  // UI helpers (presentation only)
  const initials = (u) => {
    const f = (u?.firstName || '').trim();
    const l = (u?.lastName || '').trim();
    const fi = f ? f[0].toUpperCase() : '';
    const li = l ? l[0].toUpperCase() : '';
    return (fi + li) || (u?.email?.[0]?.toUpperCase() || 'U');
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{background: 'linear-gradient(135deg, #0f172a 0%, #111827 35%, #0b1020 100%)'}}>
      {/* Brand-only navbar to match Signup theme */}
      <nav className="navbar navbar-dark bg-transparent py-3">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2" href="#" onClick={(e)=>e.preventDefault()}>
            <i className="bi bi-stars text-info"></i>
            <span className="fw-bold" style={{letterSpacing: '.5px'}}>OnlyFansPro</span>
          </a>
        </div>
      </nav>

      <div className="container py-4 flex-grow-1">
        <div className="d-flex align-items-center justify-content-between text-white mb-3">
          <div>
            <h2 className="h4 mb-1">Dashboard</h2>
            <div className="small text-white-50">Your community at a glance</div>
          </div>
        </div>

        {dedupedUsers?.length === 0 ? (
          <div className="text-center text-white-50 py-5">No users found.</div>
        ) : (
          <div className="row g-3">
            {dedupedUsers.map((user, i) => (
              <div className="col-12 col-md-6 col-lg-4" key={user._id || user.id || user.email || i}>
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="rounded-circle bg-info bg-opacity-25 d-flex align-items-center justify-content-center me-3" style={{width: 56, height: 56}}>
                        <span className="fw-semibold text-info">{initials(user)}</span>
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-semibold">{user.firstName} {user.lastName}</div>
                        <div className="text-muted small d-flex align-items-center">
                          <i className="bi bi-envelope me-1"></i>
                          <span className="text-truncate" title={user.email}>{user.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="badge rounded-pill text-bg-success">Available</span>
                      <div className="text-muted small d-none d-sm-flex align-items-center gap-3">
                        <span className="d-inline-flex align-items-center"><i className="bi bi-people me-1"></i> Followers</span>
                        <span className="d-inline-flex align-items-center"><i className="bi bi-camera-video me-1"></i> Posts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="py-4 bg-transparent">
        <div className="container d-flex flex-wrap justify-content-between align-items-center gap-2 small text-white-50">
          <div>© {new Date().getFullYear()} OnlyFansPro</div>
          <div className="d-flex gap-3">
            <span>Dashboard</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
