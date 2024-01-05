import "./card.css";
import Button from "../button/button";
import { useState } from "react";

const Card = (props) => {
   const [count, setCount] = useState(0);
  const { food, onAddItem, onRemoveItem } = props;

  const handleIncrement = () =>{
      setCount(prev => prev + 1);
      onAddItem(food);
  }
  const handleDecrement = () =>{
   setCount(prev => prev - 1);
      onRemoveItem(food);
  }

  return <div className="card">
     <span className={`${count !== 0 ? 'card_badge' : 'card_badge-hidden'}`}>{count}</span>

     <div className="image_container">
        <img src={food.Image}
        loading="lazy"
         alt={food.title}
         width={'100%'}
         height={'230px'} />
     </div>
     <div className="card_body">
        <h2 className="card_title">{food.title}</h2>
        <div className="card_price">
            {food.price.toLocaleString('en-US',
            {style:'currency',
            currency:'USD',})}
        </div>
     </div>
     <div className="hr"></div>

     <div className="btn_container">
        <Button title={'+'} onClick={handleIncrement}  type= {"add"}/>
        {count !== 0 && (  <Button title={'-'} onClick={handleDecrement}  type= {"remove"}/>)}
        
     </div>
    </div>;
};

export default Card;
