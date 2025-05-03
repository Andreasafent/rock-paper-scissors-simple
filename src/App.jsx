import { useEffect, useState } from 'react'
import './App.css'
import { Grab, HandIcon, Scissors } from 'lucide-react'


function App() {
  const choices = ['rock', 'paper', 'scissors'];
  const rules = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  }

  const [started, setStarted] = useState(false);
  const [choice, setChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [winner, setWinner] = useState(false);
  const [draw, setDraw] = useState(false);

  const handleClick = (value) => {
    setStarted(true);
    setChoice(value);
    const rand = Math.floor(Math.random() * 3);
    setComputerChoice(choices[rand]);

    
  }

  useEffect(() => {
    if(choice !== computerChoice){      
      if(rules[choice] === computerChoice){
        setWinner(true);
      }
    }else{
      setDraw(true)
    }
  }, [choice]);



  return (
    <div className="flex items-center justify-center bg-orange-400 h-[100vh]">
      <div className="flex flex-col items-center justify-between w-[60vw] h-[70vh] bg-white shadow-xl rounded-3xl p-15">
        <div className="w-full text-end">
          <p className="text-xl">Computer: <span className="font-bold">1</span></p>
          <p className="text-xl">You: <span className="font-bold">0</span></p>
        </div>
        <div className="flex items-between justify-between gap-13">
          {
            choices.map((value, index, array) => (
              <button
                key={index}
                className="rounded-full w-40 h-40 bg-yellow-400 flex items-center justify-center cursor-pointer"
                onClick={() => handleClick(value)}
              >
                {value === 'rock' && <Grab size={100} />}
                {value === 'paper' && <HandIcon size={100} />}
                {value === 'scissors' && <Scissors size={100} />}
              </button>
            ))
          }
        </div>
        {
          choice ? (

            <div className="flex flex-col items-center">
              <p className='text-xl'>You choose: <span className="font-bold uppercase">{choice}</span> </p>
              <p className='text-xl'>Computer chose: <span className="font-bold uppercase">{computerChoice}</span></p>
            </div>
          ) : (
            <div className="flex items-center">
              <p className="text-xl">Choose Your Weapon</p>
            </div>
          )
        }
        {
          started && (
            <div className="">
              {(winner) ? (                
                <button className="bg-green-500/30 px-10 py-3 font-bold text-green-500">YOU WIN</button>                
              ) : (
                <button className="bg-red-500/30 px-10 py-3 font-bold text-red-500">YOU LOSE</button>                
              )
            }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App
