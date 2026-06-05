import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// StrictMode removed — it double-invokes effects which breaks GSAP timelines
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
