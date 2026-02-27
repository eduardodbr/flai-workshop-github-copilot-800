import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const featureCards = [
  { abbr: 'US', label: 'Users',       desc: 'Manage profiles and track progress.',        path: '/users' },
  { abbr: 'TM', label: 'Teams',       desc: 'Create squads and push each other forward.', path: '/teams' },
  { abbr: 'AC', label: 'Activities',  desc: 'Log workouts and keep a daily rhythm.',      path: '/activities' },
  { abbr: 'WO', label: 'Workouts',    desc: 'Stay on plan with focused sessions.',        path: '/workouts' },
  { abbr: 'LB', label: 'Leaderboard', desc: 'Climb the ranks and celebrate wins.',        path: '/leaderboard' },
];

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero */}
      <div className="octo-hero">
        <div className="octo-hero-inner">
          <p className="octo-eyebrow">YOUR FITNESS COMMAND CENTER</p>
          <h1 className="octo-heading">
            Welcome to <span className="octo-brand-accent">OctoFit</span> Tracker
          </h1>
          <p className="octo-subtitle">Track your fitness activities, compete with your team, and stay motivated.</p>
          <div className="octo-hero-actions">
            <button className="btn octo-btn-primary me-2" onClick={() => navigate('/users')}>Get Started</button>
            <button className="btn octo-btn-outline" onClick={() => navigate('/leaderboard')}>View Leaderboard</button>
          </div>
        </div>
      </div>

      {/* Feature cards — Bootstrap card grid */}
      <div className="octo-cards-row">
        <div className="row g-3 w-100">
          {featureCards.map((card) => (
            <div key={card.abbr} className="col-6 col-md-4 col-lg">
              <div className="card h-100 octo-feature-card" onClick={() => navigate(card.path)} role="button">
                <div className="card-body">
                  <div className="octo-card-icon mb-3">{card.abbr}</div>
                  <h6 className="card-title fw-bold mb-1">{card.label}</h6>
                  <p className="card-text text-muted small mb-0">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      {/* Bootstrap navbar with octo colour overrides */}
      <nav className="navbar navbar-expand-lg octo-navbar">
        <div className="container-fluid px-4">
          <NavLink className="navbar-brand octo-navbar-brand" to="/">
            <img src="/octofitapp-small.png" alt="OctoFit logo" />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler border-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octoNav"
            aria-controls="octoNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="octoNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {[['/', 'Home', true], ['/users', 'Users'], ['/teams', 'Teams'],
                ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'], ['/workouts', 'Workouts']
              ].map(([path, label, end]) => (
                <li className="nav-item" key={path}>
                  <NavLink
                    className={({ isActive }) => 'nav-link octo-nav-link' + (isActive ? ' active' : '')}
                    to={path}
                    end={!!end}
                  >{label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users"       element={<div className="container mt-4"><Users /></div>} />
        <Route path="/teams"       element={<div className="container mt-4"><Teams /></div>} />
        <Route path="/activities"  element={<div className="container mt-4"><Activities /></div>} />
        <Route path="/leaderboard" element={<div className="container mt-4"><Leaderboard /></div>} />
        <Route path="/workouts"    element={<div className="container mt-4"><Workouts /></div>} />
      </Routes>
    </Router>
  );
}

export default App;
