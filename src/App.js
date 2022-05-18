import { createContext, useEffect, useState } from 'react';
import { boardDefault, boardColorDefault, getWords } from './Words';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import Instructions from './components/Instructions';


export const AppContext = createContext();


function App() {
  const [board, setBoard] = useState(boardDefault);
  const [boardColor, setBoardColor] = useState(boardColorDefault);
  const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [correctWord, setCorrectWord] = useState(null);
  const [words, setWords] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameStatus, setGameStatus] = useState({ gameOver: false, winner: false });

  const restartGame = (e) => {
    window.location.reload(false);
  }

  useEffect(() => {
    getWords()
      .then(data => {
        setCorrectWord(data.correctWord);
        console.log(data.correctWord);
        setWords(data.words);
      });
  }, []);


  const evaluateAttempt = (guess, attempt) => {
    const countLetters = {};

    for (let i = 0; i < 5; i++) {
      countLetters[correctWord[i]] = (countLetters[correctWord[i]] || 0) + 1;
    }

    let newRowBoardColor = ["error", "error", "error", "error", "error"];

    for (let i = 0; i < 5; i++) {
      if (guess[i] === correctWord[i]) {
        newRowBoardColor[i] = "correct";
        countLetters[guess[i]]--;
      }
    }

    let newDisabledLetters = [];
    for (let i = 0; i < 5; i++) {
      if (correctWord.includes(guess[i]) && countLetters[guess[i]] > 0 && newRowBoardColor[i] !== "correct") {
        newRowBoardColor[i] = "misplaced";
        countLetters[guess[i]]--;
      }
      if (newRowBoardColor[i] === "error") {
        newDisabledLetters.push(guess[i]);
      }
    }

    setDisabledLetters([...disabledLetters, ...newDisabledLetters]);
    let newBoardColor = [...boardColor];
    newBoardColor[attempt] = newRowBoardColor;
    setBoardColor(newBoardColor);
    return newRowBoardColor.every(color => color === "correct");
  }

  const winningGame = () => {
    setAlert({ message: `${correctWord} is correct!`, type: "success" });
    setShowAlert(true);
    setGameStatus({ gameOver: true, winner: true });
  }

  const losingGame = () => {
    setAlert({ message: `You lost, the correct word was ${correctWord}!`, type: "danger" });
    setShowAlert(true);
    setGameStatus({ gameOver: true, winner: false });
  }


  const onEnter = () => {
    if (currentAttempt.letterPos === 5) {
      const guess = board[currentAttempt.attempt].join("");

      if (!words.has(guess)) {
        setAlert({ message: `${guess} is not in the dictionary!`, type: "danger" });
        setShowAlert(true);
        setTimeout(() => { setShowAlert(false); }, 4500)
        return;
      }

      const result = evaluateAttempt(board[currentAttempt.attempt], currentAttempt.attempt);

      if (result) {
        winningGame();
        return;
      }
      if (currentAttempt.attempt === 5) {
        losingGame();
        return;
      }

      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0 });
    }
  }

  const onDelete = () => {
    if (currentAttempt.letterPos > 0) {
      const newBoard = [...board];
      newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = '';
      setBoard(newBoard);
      setCurrentAttempt({ ...currentAttempt, letterPos: currentAttempt.letterPos - 1 });
    }
  }

  const onKeyPress = (letter) => {
    const isLetter = letter.length === 1 && letter.match(/[a-z]/i);
    if (currentAttempt.letterPos < 5 && isLetter) {
      letter = letter.toUpperCase();
      const newBoard = [...board];
      newBoard[currentAttempt.attempt][currentAttempt.letterPos] = letter;
      setBoard(newBoard);
      setCurrentAttempt({ ...currentAttempt, letterPos: currentAttempt.letterPos + 1 });
    }
  }

  return (
    <div className="App">
      <AppContext.Provider value={
        {
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          onDelete,
          onEnter,
          onKeyPress,
          correctWord,
          boardColor,
          disabledLetters,
          gameStatus, 
        }}>
        <nav>
          <div className='nav-left'><a href='./'>Home</a></div>
          <h1>Wordle</h1>
          <div className='nav-right'><Instructions /></div>
        </nav>

        <div className='game'>
          <Alert show={showAlert} variant={alert.type} className="alert" >
            {alert.message}
          </Alert>
          <Board />
          {gameStatus.gameOver ?
            <Button className='play-again' variant="light" onClick={restartGame}>
              Play Again?
            </Button> :
            <Keyboard />
          }
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
