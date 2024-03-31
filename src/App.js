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
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  };

  const shuffleCards = () => {
    const shuffleCardsArr = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((cardImage, index) => ({ src: cardImage, id: index, matched: false }));

    setCards(shuffleCardsArr);
    setTurns(0);
  };

  useEffect(()=>{
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card;
            }
          })
        })
      } else {
      }
      increaseTurn();
    }
  }, [choiceOne, choiceTwo])

  // increase a turn
  const increaseTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prev => prev + 1)
  }

  console.log(cards)

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <div>Turns: {turns}</div>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
