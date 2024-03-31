import "./App.css";
import { useState } from "react";
import SingleCard from "./components/SingleCard";

import { cardImages } from "./img";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const shuffleCards = () => {
    const shuffleCardsArr = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((cardImage, index) => ({ src: cardImage, id: index }));

    setCards(shuffleCardsArr);
    setTurns(0);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
      {cards.map((card) => (
        <SingleCard key={card.id} card={card}></SingleCard>
      ))}
    </div>
    </div>
  );
}

export default App;
