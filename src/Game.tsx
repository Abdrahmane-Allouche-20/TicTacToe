import React, { useEffect, useState } from 'react'
import X from './assets/X.png'
import O from './assets/O.png'
import restart from './assets/restart.png'

function Game() {
  const [squares,setSquares]=useState<(string|null)[]>(Array(9).fill(null))
  const [isTurn,setIsTurn]=useState(true)
  const [status,setStatus]=useState<React.ReactNode>('')
  const [XCounter,setXCounter]=useState(0)
  const [OCounter,setOCounter]=useState(0)
  const [active ,setActive]= useState<boolean[]>(Array(9).fill(false));
 
type Box ={
  value: null | string,
  isClicked:boolean,
  onClick():void
}
  function Square({value , onClick,isClicked}:Box){
    return (
     <button 
     onClick={onClick}
     className={`w-[90px] h-[90px]  md:w-24 md:h-24 ${isClicked ?'scale-[0.85] transition-all  shadow-[inset_1px_6px_23px_4px_#1a202c] duration-300':'hover:scale-105 '}transition-all duration-200 bg-blue-800 rounded-xl flex justify-center items-center`}
  >
    {value && <img className="w-12 h-12 md:w-14 md:h-14" src={value} alt="" />}</button>
    )
    
   }
   
function getWinner(squares:(string|null)[]){
  const lines=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for(let i=0;i<lines.length;i++){
    const [x,y,z]=lines[i] 
    if(squares[x]&&squares[x]===squares[y]&&squares[x]===squares[z]){
    
      return squares[x] === X ? 'X' : 'O';
    }
  }
  return null
}

  function HandleClick(index:number){
    const separated=[...squares]
    const ActiveCopy=[...active]
    ActiveCopy[index]=true
    if(separated[index]||getWinner(squares)){return}
    separated[index]=isTurn? X : O
   setActive(ActiveCopy)
    setIsTurn(!isTurn)
    setSquares(separated)

  }
 
function RestartGame(){
  setIsTurn(true)
  setSquares(Array(9).fill(null))
  setActive(Array(9).fill(false))
}
function ResetGame(){
  setOCounter(0)
  setXCounter(0)
  setIsTurn(true)
  setSquares(Array(9).fill(null))
  setActive(Array(9).fill(false))
}
  useEffect(()=>{
    const winner = getWinner(squares)
    if(winner){
      setStatus(
         <div className='flex justify-center items-center gap-3'>
        The winner is <img src={winner === 'X' ? X : O} alt="" className="w-10 h-10 inline " />
      </div>
      )
      if(winner==='X'){
        setXCounter(prev=>prev+1)
      }else{
        setOCounter(prev=>prev+1)
      }
    }else if(!winner && squares.every((item)=>item!==null)){
      setStatus('thats a draw , please play again')
    }else {
      setStatus(
          <div className='flex justify-center items-center gap-3'>
          Next player is <img src={isTurn ? X : O} alt="" className="w-10 h-10 inline" />
        </div>
        )
    }
  },[squares,isTurn])
  return (
    <div className='max-w-6xl mx-auto flex flex-col justify-center items-center mt-3'>
      <div className=' gap-5 flex justify-between items-center '>
        <div className='text-base md:text-xl lg:text-lg bg-blue-800 border-4 rounded-xl border-blue-950 px-4 py-2 md:px-6 md:py-3 text-white'>Player X: <span>{XCounter}</span></div>
        <div className='text-base md:text-xl lg:text-lg bg-blue-800 border-4 rounded-xl border-blue-950 px-4 py-2 md:px-6 md:py-3 text-white'>Player O: <span>{OCounter}</span></div>
      </div>
      <div className='my-4 lg:my-2 text-lg text-center md:text-4xl lg:text-3xl font-black'>
        {status}
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        <Square isClicked={active[0]} onClick={()=>HandleClick(0)} value={squares[0]}/>
        <Square isClicked={active[1]} onClick={()=>HandleClick(1)} value={squares[1]}/>
        <Square isClicked={active[2]} onClick={()=>HandleClick(2)} value={squares[2]}/>

        <Square isClicked={active[3]} onClick={()=>HandleClick(3)} value={squares[3]}/>
        <Square isClicked={active[4]} onClick={()=>HandleClick(4)} value={squares[4]}/>
        <Square isClicked={active[5]} onClick={()=>HandleClick(5)} value={squares[5]}/>

        <Square isClicked={active[6]} onClick={()=>HandleClick(6)} value={squares[6]}/>
        <Square isClicked={active[7]} onClick={()=>HandleClick(7)} value={squares[7]}/>
        <Square isClicked={active[8]} onClick={()=>HandleClick(8)} value={squares[8]}/>
      </div>
      <div className='mt-7 flex justify-between items-center gap-5'>
        
       <button 
       onClick={RestartGame}
       className='text-lg md:text-3lx lg:text-2xl hover:scale-105 duration-300 transition-all outline outline-4 outline-blue-800 font-bold text-white px-4  md:px-6 py-3 border-white border-4 rounded-xl bg-blue-800'>
        Play Again
       </button>
       <button 
       onClick={ResetGame}
       className=' outline outline-4 outline-blue-800 font-bold text-white px-3 py-3 border-white border-4 rounded-xl bg-blue-800'>
         <img src={restart} alt=""  className='w-7 h-7 lg:w-8 lg:h-8 hover:rotate-[360deg] transition-all duration-500'/>
       </button>
      </div>
    </div>
  )
}

export default Game