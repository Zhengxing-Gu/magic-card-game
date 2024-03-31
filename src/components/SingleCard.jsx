import "./SingleCard.css";
import { coverImage } from "../img";
const SingleCard = ({card}) => {
  return (
    <div className="card" key={card.id}>
      <div>
        <img className="front" src={card.src} alt="card front"></img>
        <img className="back" src={coverImage} alt="card back"></img>
      </div>
    </div>
  );
};

export default SingleCard;
