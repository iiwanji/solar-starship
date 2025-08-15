import React from 'react'

function ControlsInfo() {
  return (
    <div className="controls-info">
      <h4>Controls</h4>
      <div className="control">
        <span className="key">W</span>
        <span>Forward</span>
      </div>
      <div className="control">
        <span className="key">S</span>
        <span>Backward</span>
      </div>
      <div className="control">
        <span className="key">A</span>
        <span>Left</span>
      </div>
      <div className="control">
        <span className="key">D</span>
        <span>Right</span>
      </div>
             <div className="control">
         <span className="key">Q</span>
         <span>Down</span>
       </div>
       <div className="control">
         <span className="key">E</span>
         <span>Up</span>
       </div>
      <div className="control">
        <span className="key">Mouse</span>
        <span>Look around</span>
      </div>
      <div className="control">
        <span className="key">Space</span>
        <span>Fire weapons</span>
      </div>
      <div className="control">
        <span className="key">R</span>
        <span>Reset camera</span>
      </div>
    </div>
  )
}

export default ControlsInfo
