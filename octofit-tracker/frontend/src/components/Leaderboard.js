import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  const medalColor = (rank) => {
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    return null;
  };

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div className="card octo-page-card mb-4">
      <div className="card-header">
        <span className="octo-header-icon">LB</span>
        <h4>Leaderboard</h4>
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
                  <th style={{width:'60px'}}>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted py-4">No entries found.</td></tr>
                ) : entries.map((entry, index) => {
                  const rank = index + 1;
                  const color = medalColor(rank);
                  return (
                    <tr key={entry.id || index}>
                      <td className="text-center">
                        {color
                          ? <span style={{color, fontSize:'1.1rem'}} title={`Rank ${rank}`}>&#9733;</span>
                          : <span className="text-muted">{rank}</span>}
                      </td>
                      <td className="fw-semibold">
                        {typeof entry.user === 'object' ? entry.user.name : entry.user}
                      </td>
                      <td><span className="badge bg-danger bg-opacity-85 text-white">{entry.score}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {!loading && `${entries.length} entr${entries.length !== 1 ? 'ies' : 'y'} total`}
      </div>
    </div>
  );
}

export default Leaderboard;
