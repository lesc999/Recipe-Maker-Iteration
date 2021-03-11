import React from 'react';
import { useInventory, useSetInventory } from '../contexts/InventoryContexts';
import axios from 'axios';

/**
 * This is a IngredientDisplay component for each individual ingredients.
 *
 * @param {*} { itemName, use, _id } These parameters are specified from its parent component, InventoryBucket.
 * @return {*} DOM element for single ingredient
 */
function IngredientDisplay({ itemName, use, _id }) {
  const inventory = useInventory();
  const setInventory = useSetInventory();

  let color = use ? '#fff' : '#fff';
  /**
   * This function will delete this ingredient.
   * Delete request will be sent to the server to delete this ingredient from the database
   * and update its state in the DOM.
   */
  function deleteIng() {
    const deleteThis = { data: [_id] };

    // Update server
    axios
      .delete('/api/inventory', deleteThis)
      .then((res) => {
        console.log(`${itemName} with ID:${_id} has been deleted`);
      })
      .catch((e) => {
        console.log('err: delete request is not complete');
      });

    // Update state
    let newState = { ...inventory };
    delete newState[itemName];
    setInventory(newState);
  }

  /**
   * This function will update
   *
   */
  function checkMarked() {
    let boolean;

    // boolean REPRESENTS THE "Checked" STATUS OF THE INGREDIENT
    boolean = !inventory[itemName].use

    let updatedIng = {
      [itemName]: { itemName: itemName, bucketNumber: inventory[itemName].bucketNumber, use: boolean, _id: _id },
    };

    //Update state
    let newState = { ...inventory, ...updatedIng };
    setInventory(newState);
  }

  return (
    <div className="ingredientDisplay" style={{ backgroundColor: color }}>
      <input className='checkbox' type="checkbox" onChange={(e) => checkMarked(e)} autoComplete="on" />
      {itemName}
      <div className="upDownButtons">
        <button className="deleteButtons" onClick={(e) => deleteIng(e)}>
        <i className="fa fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default IngredientDisplay;
