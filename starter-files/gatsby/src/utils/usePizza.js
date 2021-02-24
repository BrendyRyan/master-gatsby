import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create state to hold order
  //* We got rid of this line because we moved useState up to the provider (context)
  // const [order, setOrder] = useState([]);
  //* Now we access both our state and our updater function (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);
  // 2. Make function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make function to remove things to order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // 4. Send this data to the serverless fn when they check out

  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
