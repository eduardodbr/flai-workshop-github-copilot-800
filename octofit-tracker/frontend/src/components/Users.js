import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Users: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div className="card octo-page-card mb-4">
      <div className="card-header">
        <span className="octo-header-icon">US</span>
        <h4>Users</h4>
      </div>
      <div className="card-body p-0">
        {error && <div className="alert alert-danger m-3">{error}</div>}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center p-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered octo-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="4" className="text-center text-muted py-4">No users found.</td></tr>
                ) : users.map((user, index) => (
                  <tr key={user.id || index}>
                    <td className="text-muted">{index + 1}</td>
                    <td className="fw-semibold">{user.name}</td>
                    <td>{user.email}</td>
                    <td><span className="badge bg-secondary">{user.age}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {!loading && `${users.length} user${users.length !== 1 ? 's' : ''} total`}
      </div>
    </div>
  );
}

export default Users;
