import React, { useState, useEffect } from 'react';
import './SudokuGame.css';

const initialPuzzle = [
  [3, 2, '', 6, '', 5, 8, '', ''],
  [4, '', '', '', '', '', '', '', ''],
  ['', 7, '', 2, '', '', '', 6, ''],
  [1, '', 5, '', '', '', 9, '', 8],
  ['', 7, '', '', '', '', '', 2, 5],
  [9, 2, '', '', '', '', 8, '', 1],
  ['', '', 4, '', '', '', '', '', ''],
  [7, '', 1, '', 8, 4, 2, '', 6],
  [5, 3, '', 7, 6, '', 9, 4, ''],
];

function SudokuGame() {
  const [board, setBoard] = useState(
    initialPuzzle.map(row => row.map(cell => (cell === 0 ? '' : cell)))
  );
  const [selectedCell, setSelectedCell] = useState(null);
  const [gameTime, setGameTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // THEME STATE: can be "blue" or "yellow"
  const [theme, setTheme] = useState('blue');

  // Toggle between themes
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'blue' ? 'yellow' : 'blue'));
  };

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setGameTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const getRemainingNumbers = () => {
    const counts = Array(9).fill(9);
    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell !== '' && typeof cell === 'number') {
          counts[cell - 1] -= 1;
        }
      });
    });
    return counts;
  };

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleNumberClick = (number) => {
    if (selectedCell && !isPaused) {
      const newBoard = board.map(r => [...r]);
      newBoard[selectedCell.row][selectedCell.col] = number;
      setBoard(newBoard);
    }
  };

  const handlePauseClick = () => {
    setIsPaused(!isPaused);
  };

  const handleCheckClick = () => {
    alert('Check function not implemented yet!');
  };

  const minutes = String(Math.floor(gameTime / 60)).padStart(2, '0');
  const seconds = String(gameTime % 60).padStart(2, '0');

  return (
    <div className={`sudoku-container ${theme}-theme`}>
      <header className="sudoku-header">
        <h1 className="sudoku-title">Sudoku</h1>
        <div className="sudoku-header-buttons">
          <button className="btn" onClick={handleCheckClick}>
            Check
          </button>
          <button className="btn" onClick={handlePauseClick}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          {/* The new button to toggle theme */}
          <button className="btn" onClick={toggleTheme}>
            Switch Theme
          </button>
        </div>
      </header>

      <main className="sudoku-main">
        <div className="sudoku-board">
          {board.map((row, rowIndex) => (
            <div className="sudoku-row" key={rowIndex}>
              {row.map((cell, colIndex) => {
                const isSelected =
                  selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                return (
                  <div
                    className={
                      'sudoku-cell' +
                      (isSelected ? ' selected' : '') +
                      (cell !== '' ? ' filled' : '')
                    }
                    key={colIndex}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {cell}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <aside className="sudoku-sidebar">
          <div className="sidebar-section">
            <h2 className="sidebar-label">Time</h2>
            <div className="time-display">
              {minutes}:{seconds}
            </div>
          </div>
          <div className="sidebar-section">
            <h2 className="sidebar-label">Game difficulty</h2>
            <div className="difficulty-label">very easy</div>
          </div>
          <div className="sidebar-section">
            <h2 className="sidebar-label">Remaining numbers</h2>
            <div className="remaining-grid">
              {getRemainingNumbers().map((count, i) => {
                const number = i + 1;
                return (
                  <div
                    className="remaining-cell"
                    key={number}
                    onClick={() => handleNumberClick(number)}
                  >
                    <div className="remaining-number">{number}</div>
                    <div className="remaining-count">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default SudokuGame;
