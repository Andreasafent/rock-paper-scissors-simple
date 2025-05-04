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
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(false);
    let [score, setScore] = useState(0);
    let [computerScore, setComputerScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleClick = (value) => {
        setShowResult(false);
        setStarted(true);
        const rand = Math.floor(Math.random() * 3);
        const computer = choices[rand];
        
        setChoice(value);
        setComputerChoice(computer);

        setTimeout(() => {
            setShowResult(true);
        }, 1000);


        if (value === computer) {
            setDraw(true);
            setWinner(null);
        } else if (rules[value] === computer) {
            setTimeout(() => {
                setScore(prev => prev + 1);                
            }, 1000);
            setWinner(true);
            setDraw(false)
        } else {
            setTimeout(() => {
                setComputerScore(prev => prev + 1)
            }, 1000);
            setWinner(false);
            setDraw(false);
        }
    }

    const resetGame = () => {
        setStarted(false);
        setScore(0);
        setComputerScore(0);
        setChoice(null);
        setComputerChoice(null);
        setDraw(false);
        setWinner(null);
        setShowResult(false);
    }

    const renderResultButton = () => {
        if (draw) {
            return <button className="bg-gray-500/30 px-10 py-3 font-bold text-gray-500">DRAW</button>
        }

        if (winner) {
            return <button className="bg-green-500/30 px-10 py-3 font-bold text-green-500">YOU WIN</button>
        }

        return (
            <button className="bg-red-500/30 px-10 py-3 font-bold text-red-500">YOU LOSE</button>
        )
    }



    return (
        <div className="flex items-center justify-center bg-orange-400 h-[100vh]">
            <div className="flex flex-col items-center justify-between w-[60vw] h-[80vh] bg-white shadow-xl rounded-3xl p-15 gap-5">
                <div className="w-full text-end">
                    <p className="text-xl">Computer: <span className="font-bold">{computerScore}</span></p>
                    <p className="text-xl">You: <span className="font-bold">{score}</span></p>
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
                            <p className='text-xl'>Computer chose: <span className="font-bold uppercase">{showResult ? (computerChoice) : ('Thinking...')}</span></p>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <p className="text-xl font-bold">Choose Your Weapon</p>
                        </div>
                    )
                }
                {
                    started && (
                        <div className="flex flex-col items-center gap-4 mt-5">
                            {showResult && (
                                renderResultButton()
                            )}
                            {
                                showResult && (
                                    <button
                                        className="bg-blue-500/30 px-10 py-3 font-bold text-blue-500 cursor-pointer"
                                        onClick={() => resetGame()}
                                    >
                                        RESET GAME
                                    </button>
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
