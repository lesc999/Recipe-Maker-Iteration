import React from 'react';
import AddIngredient from './AddIngredient';
import IngredientDisplay from './IngredientDisplay';

function InventoryBucket({ bucket, bucketNumber }) {
  let IngredientsDisplay = [];

  if (Object.keys(bucket)[0]) {
    Object.values(bucket).forEach((ing, index) => {
      IngredientsDisplay.push(
        <IngredientDisplay key={`b${bucketNumber}id${index}`} 
        itemName={ing.itemName} use={ing.use} _id={ing._id} />
      );
    });
  }

  return (
    <div className="bucket">
      <AddIngredient key={`ai${bucketNumber}`} bucketNumber={bucketNumber} />
      {IngredientsDisplay}
    </div>
  );
}

export default InventoryBucket;
