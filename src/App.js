import "./App.css";
import { useEffect, useState } from "react";
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
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)

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
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCardsArr);
    setTurns(0);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
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
      } else {
        setTimeout(() => increaseTurn(), 800);
      }
    }
  }, [choiceOne, choiceTwo]);

  // increase a turn
  const increaseTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false)
  };

  // start a new game automatically
  useEffect(()=>{
    newGame()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={newGame}>New Game</button>
      <div className="status-bar">
        <div>Time</div>
        <div>Turns: {turns}</div>
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
