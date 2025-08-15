import React, { useState, useEffect } from 'react'
import SpaceScene from './components/SpaceScene'
import LoadingScreen from './components/LoadingScreen'
import HUD from './components/HUD'
import ControlsInfo from './components/ControlsInfo'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingStatus, setLoadingStatus] = useState('Initializing...')
  const [shipData, setShipData] = useState({
    speed: 0,
    altitude: 0,
    fuel: 100,
    shields: 100,
    weapons: 'Ready'
  })

  useEffect(() => {
    // Симуляция загрузки
    const loadingSteps = [
      { progress: 20, status: 'Loading Babylon.js engine...' },
      { progress: 40, status: 'Initializing 3D scene...' },
      { progress: 60, status: 'Creating space environment...' },
      { progress: 80, status: 'Loading ship models...' },
      { progress: 100, status: 'Ready for launch!' }
    ]

    let currentStep = 0
    const loadingInterval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        setLoadingProgress(step.progress)
        setLoadingStatus(step.status)
        currentStep++
      } else {
        clearInterval(loadingInterval)
        setTimeout(() => setIsLoading(false), 1000)
      }
    }, 800)

    return () => clearInterval(loadingInterval)
  }, [])

  // Обновление данных корабля (симуляция)
  useEffect(() => {
    if (!isLoading) {
      const gameLoop = setInterval(() => {
        setShipData(prev => ({
          ...prev,
          speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 2),
          altitude: Math.max(0, prev.altitude + (Math.random() - 0.5) * 10),
          fuel: Math.max(0, prev.fuel - 0.01),
          shields: Math.max(0, prev.shields - 0.005)
        }))
      }, 100)

      return () => clearInterval(gameLoop)
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <LoadingScreen 
        progress={loadingProgress} 
        status={loadingStatus} 
      />
    )
  }

  return (
    <div className="App">
      <SpaceScene />
      <HUD shipData={shipData} />
      <ControlsInfo />
    </div>
  )
}

export default App
