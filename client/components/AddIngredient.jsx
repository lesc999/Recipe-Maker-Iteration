import React, { useState } from 'react';
import { useInventory, useSetInventory } from '../contexts/InventoryContexts';
import axios from 'axios';

function AddIngredient({ bucketNumber }) {
  const inventory = useInventory();
  const setInventory = useSetInventory();
  const [ing, setIng] = useState('');

  function addIng(ing) {
    if (inventory[ing]) return window.alert('Already in inventory!');
    const tempIng = { [ing]: { itemName: `${ing}`, bucketNumber: bucketNumber, use: false} };
    const newBucket = { ...inventory, ...tempIng };
    axios
      .post('./api/inventory', tempIng)
      .then((res) => {
        setInventory(newBucket);
        console.log('AddIngRes', res.data);
      })
      .catch((err) => {
        console.log('AddIngErr', err);
      });
    console.log('newbucket', newBucket);
    console.log('inventory', inventory);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ing) return;
    addIng(ing);
    setIng('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id="addInput" type="text" value={ing} onChange={(e) => setIng(e.target.value)} placeholder="Add an Ingredient.." />
    </form>
  );
}

export default AddIngredient;
