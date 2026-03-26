import { Routes, Route, NavLink } from 'react-router-dom'
import './App.css'

import WhatIsApi from './pages/WhatIsApi'
import AnatomyOfRequest from './pages/AnatomyOfRequest'
import AnatomyOfResponse from './pages/AnatomyOfResponse'
import ApiPlayground from './pages/ApiPlayground'

const lessons = [
  { path: '/', label: 'What Is an API?', end: true },
  { path: '/anatomy-of-request', label: 'Anatomy of a Request' },
  { path: '/anatomy-of-response', label: 'Anatomy of a Response' },
  { path: '/api-playground', label: 'API Playground' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="title-group">
          <h1>Learn APIs</h1>
          <p>Understand how APIs work, what requests and responses contain, and how to read them.</p>
        </div>

        <nav className="progress-nav" aria-label="Lesson navigation">
          {lessons.map((lesson, index) => (
            <NavLink
              key={lesson.path}
              to={lesson.path}
              end={lesson.end}
              className={({ isActive }) =>
                isActive ? 'step-link active' : 'step-link'
              }
            >
              <span className="step-number">{index + 1}</span>
              <span className="step-label">{lesson.label}</span>
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<WhatIsApi />} />
          <Route path="/anatomy-of-request" element={<AnatomyOfRequest />} />
          <Route path="/anatomy-of-response" element={<AnatomyOfResponse />} />
          <Route path="/api-playground" element={<ApiPlayground />} />
        </Routes>
      </main>
    </div>
  )
}

export default App