import React, { useEffect, useRef, useState } from 'react'
import Title from './icon/title.png'
import ReactDOMServer from 'react-dom/server';
import { createRoot } from 'react-dom/client';
import Progress from './progress';

const App = () => {

  const [myJoke, setMyJoke] = useState("")
  const [open,setOpen] = useState(false)

  const jokeCard = useRef(null)

  const Joke = async () => {
    try {
      let url = "https://icanhazdadjoke.com/"

      let options = {
        method: 'GET',
        headers: {
          "Accept": "application/json"
        }
      };

      setOpen(true)

      let res = await fetch(url, options)
      let data = await res.json()

      const { joke } = data;

      setOpen(false)
      setMyJoke(joke)
      console.log(joke)
    }
    catch (error) {
      console.log(error)
    }
  }

  const addJoke = () => {
    jokeCard.current.innerHTML = `<h1>${myJoke}</h1>` 
  }

  useEffect(() => {
    Joke()
  }, [])

  useEffect(() => {
    addJoke()
  },[myJoke])

  useEffect(() => {
    if (open === true){
      const htmlString = ReactDOMServer.renderToString(<Progress />);
      jokeCard.current.innerHTML=htmlString;
      const root = createRoot(jokeCard.current );
      root.render(<Progress />);
    }
  },[open])

  return (
    <div className='bg-[#EEEEEE] h-screen'>
      <div className='flex flex-col items-center justify-center'>
        <div className='w-72 h-52 sm:w-96 sm:h-64 -my-8'>
          <img className='w-full h-full' src={Title} alt="Title" />
        </div>

        <div className='bg-[#f7db4e] border shadow-md w-80 h-96 sm:w-[600px] sm:h-80 my-6 rounded-xl flex justify-center items-center'>
          <div ref={jokeCard} className='flex justify-center font-bold sm:font-semibold text-2xl px-6 text-white'>

          </div>
        </div>

        <div className='bg-[#6d5de7] h-14 w-48 flex m-4 sm:mt-8 sm:mb-8 justify-center items-center rounded-md'>
          <button className='text-xl font-mono h-14 w-48' onClick={() => { Joke() }}>Generate Joke</button>
        </div>
      </div>
    </div>

  )
}

export default App
