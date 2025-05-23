import { useState } from "react"
import Square from "./components/Square"




function Board( {xIsNext, squares, onPlay} ) {
  const winnerData = checkWinner(squares);
  const winningLine = winnerData ? winnerData.line : [];
  function handleClick(i){
    if(squares[i] || checkWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares);
    
  }


  let status;
  if (winnerData) {
    status = "winner: " + winnerData.winner;
  } else {
    status = "Next  player: " + (xIsNext ? "X" : "O" )
  }

  return (
    <>
   <div className="container"> 
    <h1 className="game_heading">Tic Tac Toe</h1>
    <div className="status">{status}</div>
      <div className="game_grid">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)}
          isWinningSquare={winningLine.includes(i)}
          />
        ))}
        </div>
    </div>
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
      const nextHistory= [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      
  }

  function jumpTo(nextMove) {
      setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to Game Start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  })

  return (
    <div clasName="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      
    </div>
  )
}

function checkWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i <lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return { winner: squares[a], line: [a, b ,c]};

    }
  }
  return null;
}