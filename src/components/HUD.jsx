import React from 'react'

function HUD({ shipData }) {
  return (
    <div className="hud">
      <div className="hud-overlay">
        <h3>Ship Status</h3>
        <p>
          Speed: <span className="value">{shipData.speed.toFixed(1)} km/s</span>
        </p>
        <p>
          Altitude: <span className="value">{shipData.altitude.toFixed(0)} km</span>
        </p>
        <p>
          Fuel: <span className="value">{shipData.fuel.toFixed(1)}%</span>
        </p>
        <p>
          Shields: <span className="value">{shipData.shields.toFixed(1)}%</span>
        </p>
        <p>
          Weapons: <span className="value">{shipData.weapons}</span>
        </p>
      </div>
    </div>
  )
}

export default HUD
