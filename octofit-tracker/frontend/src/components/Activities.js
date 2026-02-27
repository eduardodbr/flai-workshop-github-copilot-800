import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Activities: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div className="card octo-page-card mb-4">
      <div className="card-header">
        <span className="octo-header-icon">AC</span>
        <h4>Activities</h4>
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
                  <th>User</th>
                  <th>Activity Type</th>
                  <th>Duration (min)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr><td colSpan="5" className="text-center text-muted py-4">No activities found.</td></tr>
                ) : activities.map((activity, index) => (
                  <tr key={activity.id || index}>
                    <td className="text-muted">{index + 1}</td>
                    <td className="fw-semibold">
                      {typeof activity.user === 'object' ? activity.user.name : activity.user}
                    </td>
                    <td><span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25">{activity.activity_type}</span></td>
                    <td>{activity.duration}</td>
                    <td>{activity.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {!loading && `${activities.length} activit${activities.length !== 1 ? 'ies' : 'y'} total`}
      </div>
    </div>
  );
}

export default Activities;
