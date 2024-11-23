import React from 'react';
import './App.css';

const App = () => {
  const [currentPlayer, setCurrentPlayer] = React.useState(true);
  const [resetCounter, setResetCounter] = React.useState(0);
  const [gameStatus, setGameStatus] = React.useState<{
    winner: string | null;
    isGameOver: boolean;
  }>({ winner: null, isGameOver: false });

  const handleGameEnd = (winner: string | null) => {
    setGameStatus({ winner, isGameOver: true });
  };

  const resetGame = () => {
    setCurrentPlayer(true);
    setGameStatus({ winner: null, isGameOver: false });
    setResetCounter((prev) => prev + 1);
  };

  return (
    <div className="MainContainer">
      {gameStatus.winner && <div>Winner: {gameStatus.winner}!</div>}
      <button onClick={resetGame}>New Game</button>
      <BoardContainer
        onPlayerChange={setCurrentPlayer}
        onGameEnd={handleGameEnd}
        isGameOver={gameStatus.isGameOver}
        resetCounter={resetCounter}
      />
      <Status playerFlag={currentPlayer} />
    </div>
  );
};

function BoardContainer({
  onPlayerChange,
  onGameEnd,
  isGameOver,
  resetCounter,
}: {
  onPlayerChange: (playerFlag: boolean) => void;
  onGameEnd: (winner: string | null) => void;
  isGameOver: boolean;
  resetCounter: number;
}) {
  return (
    <div className="BoardContainer">
      <TicTacToeBoard
        onPlayerChange={onPlayerChange}
        onGameEnd={onGameEnd}
        isGameOver={isGameOver}
        resetCounter={resetCounter}
      />
    </div>
  );
}

function isAlreadyFilled(cells: string[], position: number) {
  return cells[position] !== null;
}

function TicTacToeBoard({
  onPlayerChange,
  onGameEnd,
  isGameOver,
  resetCounter,
}: {
  onPlayerChange: (playerFlag: boolean) => void;
  onGameEnd: (winner: string | null) => void;
  isGameOver: boolean;
  resetCounter: number;
}) {
  const [cells, setCells] = React.useState(Array(9).fill(null));
  const [turnFlag, setTurnFlag] = React.useState(true);

  const checkWin = (squares: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleCellClick = (position: number) => {
    if (isGameOver || isAlreadyFilled(cells, position)) {
      return;
    }

    const newCells = [...cells];
    newCells[position] = turnFlag ? 'X' : 'O';
    setCells(newCells);

    const gameWinner = checkWin(newCells);
    if (gameWinner) {
      onGameEnd(gameWinner);
      return;
    }

    const newTurnFlag = !turnFlag;
    setTurnFlag(newTurnFlag);
    onPlayerChange(newTurnFlag);
  };

  React.useEffect(() => {
    setCells(Array(9).fill(null));
    setTurnFlag(true);
    onPlayerChange(true);
  }, [resetCounter, onPlayerChange]);

  return (
    <div className="TicTacToeBoard">
      <TicTacToeCell
        position={0}
        value={cells[0]}
        onClick={() => handleCellClick(0)}
      />
      <TicTacToeCell
        position={1}
        value={cells[1]}
        onClick={() => handleCellClick(1)}
      />
      <TicTacToeCell
        position={2}
        value={cells[2]}
        onClick={() => handleCellClick(2)}
      />
      <TicTacToeCell
        position={3}
        value={cells[3]}
        onClick={() => handleCellClick(3)}
      />
      <TicTacToeCell
        position={4}
        value={cells[4]}
        onClick={() => handleCellClick(4)}
      />
      <TicTacToeCell
        position={5}
        value={cells[5]}
        onClick={() => handleCellClick(5)}
      />
      <TicTacToeCell
        position={6}
        value={cells[6]}
        onClick={() => handleCellClick(6)}
      />
      <TicTacToeCell
        position={7}
        value={cells[7]}
        onClick={() => handleCellClick(7)}
      />
      <TicTacToeCell
        position={8}
        value={cells[8]}
        onClick={() => handleCellClick(8)}
      />
    </div>
  );
}

function TicTacToeCell({
  position,
  value,
  onClick,
}: {
  position: number;
  value: string | null;
  onClick: () => void;
}) {
  return (
    <div className="TicTacToeCell" onClick={onClick}>
      {value}
    </div>
  );
}

function Status({ playerFlag }: { playerFlag: boolean }) {
  return (
    <div className="status">
      Current Player:
      {playerFlag ? 'X' : 'O'}
    </div>
  );
}

export default App;
