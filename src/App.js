import './App.css';
import Board from './components/Board';
import { createContext, useEffect, useState } from 'react';
import { boardDefault, boardColorDefault, getWords } from './Words';
import Keyboard from './components/Keyboard';
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';

export const AppContext = createContext();


function App() {
  const [board, setBoard] = useState(boardDefault);
  const [boardColor, setBoardColor] = useState(boardColorDefault);
  const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [correctWord, setCorrectWord] = useState(null);
  const [words, setWords] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    getWords()
      .then(data => {
        setCorrectWord(data.correctWord);
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

    for (let i = 0; i < 5; i++) {
      if (correctWord.includes(guess[i]) && countLetters[guess[i]] > 0 && newRowBoardColor[i] !== "correct") {
        newRowBoardColor[i] = "misplaced";
        countLetters[guess[i]]--;
      }
    }

    let newBoardColor = [...boardColor];
    newBoardColor[attempt] = newRowBoardColor;
    setBoardColor(newBoardColor);
    return newRowBoardColor.every(color => color === "correct");
  }

  const onEnter = () => {
    if (currentAttempt.letterPos === 5) {
      const guess = board[currentAttempt.attempt].join("");
      if (!words.has(guess)) {
        setAlertMessage(`${guess} is not a word in the dictionary.`);
        setShowAlert(true);
        setTimeout(() => {
          // After 3 seconds set the show value to false
          setShowAlert(false)
        }, 4500)
        return;
      }
      const result = evaluateAttempt(board[currentAttempt.attempt], currentAttempt.attempt);
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
      <nav>
        <h1>Wordle</h1>
      </nav>
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
          boardColor
        }}>
        <div className='game'>
          <Alert show={showAlert} variant="danger" className="alert" >
            {alertMessage}
          </Alert>
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
