import React, { useEffect, useRef } from 'react'
import * as BABYLON from 'babylonjs'

function SpaceScene() {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const engineRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Инициализация Babylon.js
    const canvas = canvasRef.current
    engineRef.current = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true
    })

    const createScene = () => {
      const scene = new BABYLON.Scene(engineRef.current)
      sceneRef.current = scene

      // Создание камеры (первое лицо)
      const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -10), scene)
      camera.setTarget(BABYLON.Vector3.Zero())
      camera.attachControl(canvas, true)
      camera.speed = 0.5
      camera.angularSensibility = 800
      camera.inertia = 0.5
      camera.fov = 0.8

      // Освещение
      const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene)
      light.intensity = 0.7

      // Дополнительное направленное освещение
      const dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(0, -1, 0), scene)
      dirLight.intensity = 0.3

      // Создание космического корабля
      createSpaceship(scene)

      // Создание космической среды
      createSpaceEnvironment(scene)

      // Создание звездного неба
      createStarfield(scene)

      // Создание планет
      createPlanets(scene)

      // Обработка ввода
      setupInputs(scene, camera)

      return scene
    }

    const createSpaceship = (scene) => {
      // Основной корпус корабля
      const shipBody = BABYLON.MeshBuilder.CreateCylinder("shipBody", {
        height: 4,
        diameter: 1.5,
        tessellation: 8
      }, scene)

      // Нос корабля
      const shipNose = BABYLON.MeshBuilder.CreateCylinder("shipNose", {
        height: 2,
        diameter: 0.8,
        tessellation: 8
      }, scene)
      shipNose.position.z = 3

      // Крылья
      const leftWing = BABYLON.MeshBuilder.CreateBox("leftWing", {
        width: 0.2,
        height: 0.1,
        depth: 2
      }, scene)
      leftWing.position.x = -1.2
      leftWing.position.z = 0

      const rightWing = BABYLON.MeshBuilder.CreateBox("rightWing", {
        width: 0.2,
        height: 0.1,
        depth: 2
      }, scene)
      rightWing.position.x = 1.2
      rightWing.position.z = 0

      // Двигатели
      const leftEngine = BABYLON.MeshBuilder.CreateCylinder("leftEngine", {
        height: 1,
        diameter: 0.3,
        tessellation: 8
      }, scene)
      leftEngine.position.x = -0.8
      leftEngine.position.z = -2.5

      const rightEngine = BABYLON.MeshBuilder.CreateCylinder("rightEngine", {
        height: 1,
        diameter: 0.3,
        tessellation: 8
      }, scene)
      rightEngine.position.x = 0.8
      rightEngine.position.z = -2.5

      // Материалы
      const shipMaterial = new BABYLON.StandardMaterial("shipMaterial", scene)
      shipMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.3)
      shipMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1)
      shipMaterial.emissiveColor = new BABYLON.Color3(0.05, 0.05, 0.1)

      shipBody.material = shipMaterial
      shipNose.material = shipMaterial
      leftWing.material = shipMaterial
      rightWing.material = shipMaterial
      leftEngine.material = shipMaterial
      rightEngine.material = shipMaterial

      // Группировка всех частей корабля
      const shipGroup = new BABYLON.TransformNode("shipGroup", scene)
      shipBody.parent = shipGroup
      shipNose.parent = shipGroup
      leftWing.parent = shipGroup
      rightWing.parent = shipGroup
      leftEngine.parent = shipGroup
      rightEngine.parent = shipGroup

      // Позиционирование корабля
      shipGroup.position = new BABYLON.Vector3(0, 0, 0)

      // Анимация двигателей
      const engineAnimation = new BABYLON.Animation(
        "engineAnimation",
        "position.z",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      )

      const keyFrames = []
      keyFrames.push({ frame: 0, value: -2.5 })
      keyFrames.push({ frame: 15, value: -2.3 })
      keyFrames.push({ frame: 30, value: -2.5 })

      engineAnimation.setKeys(keyFrames)
      leftEngine.animations = [engineAnimation]
      rightEngine.animations = [engineAnimation]

      scene.beginAnimation(leftEngine, 0, 30, true)
      scene.beginAnimation(rightEngine, 0, 30, true)

      return shipGroup
    }

    const createSpaceEnvironment = (scene) => {
      // Создание простого космического пространства
      const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000 }, scene)
      const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene)
      skyboxMaterial.backFaceCulling = false
      skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
      skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
      skybox.material = skyboxMaterial
    }

    const createStarfield = (scene) => {
      // Создание простого звездного неба
      for (let i = 0; i < 1000; i++) {
        const star = BABYLON.MeshBuilder.CreateSphere("star" + i, { diameter: 0.1, segments: 4 }, scene)
        star.position = new BABYLON.Vector3(
          (Math.random() - 0.5) * 500,
          (Math.random() - 0.5) * 500,
          (Math.random() - 0.5) * 500
        )
        
        const starMaterial = new BABYLON.StandardMaterial("starMaterial" + i, scene)
        starMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1)
        star.material = starMaterial
      }
    }

    const createPlanets = (scene) => {
      // Создание нескольких планет
      const planet1 = BABYLON.MeshBuilder.CreateSphere("planet1", { diameter: 20, segments: 32 }, scene)
      planet1.position = new BABYLON.Vector3(100, 0, 50)
      
      const planet1Material = new BABYLON.StandardMaterial("planet1Material", scene)
      planet1Material.diffuseColor = new BABYLON.Color3(0.8, 0.6, 0.4)
      planet1Material.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1)
      planet1.material = planet1Material

      const planet2 = BABYLON.MeshBuilder.CreateSphere("planet2", { diameter: 15, segments: 32 }, scene)
      planet2.position = new BABYLON.Vector3(-80, 30, -60)
      
      const planet2Material = new BABYLON.StandardMaterial("planet2Material", scene)
      planet2Material.diffuseColor = new BABYLON.Color3(0.3, 0.7, 0.9)
      planet2Material.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2)
      planet2.material = planet2Material

      // Анимация вращения планет
      const planet1Animation = new BABYLON.Animation(
        "planet1Rotation",
        "rotation.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      )

      const planet1KeyFrames = []
      planet1KeyFrames.push({ frame: 0, value: 0 })
      planet1KeyFrames.push({ frame: 30, value: 2 * Math.PI })

      planet1Animation.setKeys(planet1KeyFrames)
      planet1.animations = [planet1Animation]
      scene.beginAnimation(planet1, 0, 30, true)

      const planet2Animation = new BABYLON.Animation(
        "planet2Rotation",
        "rotation.y",
        45,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      )

      const planet2KeyFrames = []
      planet2KeyFrames.push({ frame: 0, value: 0 })
      planet2KeyFrames.push({ frame: 45, value: 2 * Math.PI })

      planet2Animation.setKeys(planet2KeyFrames)
      planet2.animations = [planet2Animation]
      scene.beginAnimation(planet2, 0, 45, true)
    }

    const setupInputs = (scene, camera) => {
      // Настройка управления
      const keys = {}
      
      scene.onKeyboardObservable.add((kbInfo) => {
        if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
          keys[kbInfo.event.code] = true
        } else if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYUP) {
          keys[kbInfo.event.code] = false
        }
      })

      // Обработка стрельбы и сброса
      scene.onKeyboardObservable.add((kbInfo) => {
        if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
          if (kbInfo.event.code === 'Space') {
            createLaserBeam(scene, camera)
          } else if (kbInfo.event.code === 'KeyR') {
            // Сброс позиции камеры
            camera.position = new BABYLON.Vector3(0, 0, -10)
            camera.setTarget(BABYLON.Vector3.Zero())
          }
        }
      })

      // Основной цикл движения
      scene.registerBeforeRender(() => {
        const moveSpeed = 0.5
        
        if (keys['KeyW']) {
          camera.position.addInPlace(camera.getDirection(BABYLON.Axis.Z).scale(moveSpeed))
        }
        if (keys['KeyS']) {
          camera.position.addInPlace(camera.getDirection(BABYLON.Axis.Z).scale(-moveSpeed))
        }
        if (keys['KeyA']) {
          camera.position.addInPlace(camera.getDirection(BABYLON.Axis.X).scale(-moveSpeed))
        }
        if (keys['KeyD']) {
          camera.position.addInPlace(camera.getDirection(BABYLON.Axis.X).scale(moveSpeed))
        }
                 if (keys['KeyQ']) {
           camera.position.addInPlace(camera.getDirection(BABYLON.Axis.Y).scale(-moveSpeed))
         }
         if (keys['KeyE']) {
           camera.position.addInPlace(camera.getDirection(BABYLON.Axis.Y).scale(moveSpeed))
         }
      })
    }

    const createLaserBeam = (scene, camera) => {
      // Создание лазерного луча
      const laser = BABYLON.MeshBuilder.CreateCylinder("laser", {
        height: 50,
        diameter: 0.1,
        tessellation: 8
      }, scene)

      const laserMaterial = new BABYLON.StandardMaterial("laserMaterial", scene)
      laserMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0)
      laserMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0)
      laser.material = laserMaterial

      // Позиционирование лазера
      laser.position = camera.position.clone()
      laser.setDirection(camera.getDirection(BABYLON.Axis.Z))

      // Анимация лазера
      const laserAnimation = new BABYLON.Animation(
        "laserAnimation",
        "position",
        30,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      )

      const keyFrames = []
      keyFrames.push({ frame: 0, value: laser.position.clone() })
      keyFrames.push({ frame: 30, value: laser.position.add(camera.getDirection(BABYLON.Axis.Z).scale(50)) })

      laserAnimation.setKeys(keyFrames)
      laser.animations = [laserAnimation]

      scene.beginAnimation(laser, 0, 30, false, 1.0, () => {
        laser.dispose()
      })
    }

    // Создание сцены
    const scene = createScene()

    // Основной цикл рендеринга
    engineRef.current.runRenderLoop(() => {
      scene.render()
    })

    // Обработка изменения размера окна
    const handleResize = () => {
      engineRef.current.resize()
    }
    window.addEventListener('resize', handleResize)

    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', handleResize)
      if (sceneRef.current) {
        sceneRef.current.dispose()
      }
      if (engineRef.current) {
        engineRef.current.dispose()
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        outline: 'none'
      }}
    />
  )
}

export default SpaceScene
