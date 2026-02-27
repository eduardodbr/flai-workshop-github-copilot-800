import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div className="card octo-page-card mb-4">
      <div className="card-header">
        <span className="octo-header-icon">TM</span>
        <h4>Teams</h4>
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
                  <th>Team Name</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted py-4">No teams found.</td></tr>
                ) : teams.map((team, index) => (
                  <tr key={team.id || index}>
                    <td className="text-muted">{index + 1}</td>
                    <td className="fw-semibold">{team.name}</td>
                    <td>
                      {Array.isArray(team.members)
                        ? team.members.map((m, i) => (
                            <span key={i} className="badge bg-light text-dark border me-1">
                              {typeof m === 'object' ? m.name : m}
                            </span>
                          ))
                        : team.members}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {!loading && `${teams.length} team${teams.length !== 1 ? 's' : ''} total`}
      </div>
    </div>
  );
}

export default Teams;
