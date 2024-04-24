import {useEffect, useState} from "react"


const FollowMouse = () => {

  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x:0, y:0})

  useEffect(() => {
    
    const handleMove = (event) => {
      const {clientX, clientY} = event
      setPosition({x: clientX, y: clientY})
    }
    //ejecutar solo cuando el boton este activado
    if(enabled){
      window.addEventListener('pointermove', handleMove)
    }
    //se ejecuta cuando se desmonte el componente
    //se ejecuta cuando se cambian las dependencias
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  },[enabled])


  //change body className
  useEffect(() => {

    document.body.classList.toggle('no-cursor', enabled)

    return() => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])



  return (
    <>
    <h3>Mouse Follower</h3>

    <div style={
      {
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: '0.8',
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}0px,${position.y}0px)`
      }
    }></div>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'}
        Activar seguir puntero
      </button>
    </>
  )
}



function App() {

  return(
    <main>
      <FollowMouse />
    </main>
  )
  
}

export default App
