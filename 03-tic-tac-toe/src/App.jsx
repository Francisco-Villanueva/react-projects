import { useState } from "react";
import reactLogo from "./assets/react.svg";
import confetti from "canvas-confetti";
import "./App.css";
import "./index.css";
import { TURNS, WINNER_COMBOS } from "./components/constants";

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

function App() {
  // const board = Array(9).fill(null);
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.x);

  const [winner, setWinner] = useState(null); //null: no hya ganador, false: hay empate

  const checkWinner = (boardToCheack) => {
    //revisamos todas las combinaciones ganadoras para ver si "x" o "u" ganaron
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;

      if (
        boardToCheack[a] &&
        boardToCheack[a] === boardToCheack[b] &&
        boardToCheack[a] === boardToCheack[c]
      ) {
        return boardToCheack[a];
      }
    }
    //si no hay ganador
    return null;
  };
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null);
  };
  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);
  };
  return (
    <div className="board">
      <h1> Tic tac toe</h1>
      <button onClick={resetGame}> Reset Game</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>

      {winner != null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "Ganó:"}</h2>

            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
