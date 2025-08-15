import React from 'react'

function LoadingScreen({ progress, status }) {
  return (
    <div className="loading-screen">
      <h1>SOLAR STARSHIP</h1>
      <div className="loading-bar">
        <div 
          className="loading-progress" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="status">{status}</div>
    </div>
  )
}

export default LoadingScreen
