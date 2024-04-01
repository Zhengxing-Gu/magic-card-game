import "./App.css";
import { useEffect, useState, useRef } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  "/img/helmet-1.png",
  "/img/potion-1.png",
  "/img/ring-1.png",
  "/img/scroll-1.png",
  "/img/shield-1.png",
  "/img/sword-1.png",
];

function App() {
  const [cards, setCards] = useState([]);
  const turnsRef = useRef(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedParis, setMatchedPairs] = useState(0);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const newGame = () => {
    const shuffleCardsArr = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((cardImage, index) => ({
        src: cardImage,
        id: index,
        matched: false,
      }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCardsArr);
    turnsRef.current = 0;
    setTimer(0);
    setMatchedPairs(0);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        increaseTurn();
        setMatchedPairs((prev) => prev + 1);
      } else {
        setTimeout(() => increaseTurn(), 800);
      }
    }
  }, [choiceOne, choiceTwo]);

  // increase a turn
  const increaseTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    turnsRef.current = turnsRef.current + 1;
    setDisabled(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);
  // start a new game automatically
  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    if (matchedParis === 6) {
      setTimeout(() => {
        alert(
          `You win! You used ${turnsRef.current} turns and ${timerRef.current.textContent} seconds.`
        );
      }, 500);
    }
  }, [matchedParis]);

  console.log(timerRef.current.textContent);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={newGame}>New Game</button>
      <div className="status-bar">
        <div>
          Time: <span ref={timerRef}>{timer}</span>
        </div>
        <div>Turns: {turnsRef.current}</div>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
