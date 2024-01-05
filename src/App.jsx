import { useCallback, useEffect, useState } from 'react';
import { getData } from './components/db'
import './App.css'
import Card from './components/card/card'
import Cart from './components/cart/cart';

const foods = getData();

const telegram = window.Telegram.WebApp;

function App() {
  const [cartItems,setCartItems] = useState([]);

  useEffect(()=> {
    telegram.ready();
  })

  const onAddItem = (item) =>{
    const existItem = cartItems.find(c => c.id === item.id);

    if(existItem){
      const newData = cartItems.map(c=> c.id === item.id ? {...existItem, quantity: existItem.quantity + 1} : c
         );
         setCartItems(newData);
    } else{
      const newData = [...cartItems, {...item, quantity: 1}];
      setCartItems(newData);
    }
  };


  const onRemoveItem = item =>{
    const existItem = cartItems.find(c => c.id === item.id);
    console.log("existItem", existItem)

    if(existItem.quantity === 1){
      const newData = cartItems.filter(c=> c.id !== existItem.id);
      console.log("DELETE_ITEM_QUANTITY_0", newData)
      setCartItems(newData);
    }else{
        const newData = cartItems.map( c => c.id === existItem.id
           ? {...existItem, quantity: existItem.quantity - 1}
            : c);
            console.log("DELETE_1_ITEM", newData)
        setCartItems(newData)
    }
  };

  const onCheckout = () =>{
    telegram.MainButton.text = 'Sotib olish';
    telegram.MainButton.show();
  };
  

  const onSendData = useCallback(()=>{
    const queryId = telegram.initDataUnsafe?.query_id;
    if(queryId){
      fetch("https://tgserver-crqs.onrender.com/web-data", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({products: cartItems,queryId: queryId }),
      });
    }else{
      telegram.sendData(JSON.stringify(cartItems))
    }
  },[cartItems] );

    useEffect(()=> {
      telegram.onEvent('mainButtonClicked', onSendData);

      return () => telegram.offEvent('mainButtonClicked', onSendData);
    },[onSendData])

  

  return (
    <>
    <h1 className='heading'>Ifooder</h1>
          <Cart  cartItems={cartItems}  onCheckout={onCheckout} />
    <div className='cards_container'>
      {
        foods.map((food) =>(
          <Card key={food.id} food={food} onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}/>
        ))
      } </div>
    </>
  )
}

export default App
