import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create state to hold order
  const [order, setOrder] = useState([]);
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
