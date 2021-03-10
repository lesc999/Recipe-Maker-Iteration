import React, { useEffect } from 'react';
import axios from 'axios';
import InventoryBucket from '../components/InventoryBucket';
import { useInventory, useSetInventory } from '../contexts/InventoryContexts';
import { useRecipe, useSetRecipe } from '../contexts/RecipeContext';

function InventoryContainer() {
  const inventory = useInventory();
  const setInventory = useSetInventory();
  const recipe = useRecipe();
  const setRecipe = useSetRecipe();

  // this works like componentDidMount and willMount
  // this is will give us the initial state of the inventory
  useEffect(() => {
    axios.get('./api/inventory').then((res) => {
      setInventory(res.data);
    });
  }, []);

  if (inventory === null) {
    return 'Loading...';
  }

  const InventoryBuckets = [];

  // for (let i = 0; i < 3; i++) {
  //   const bucket = Object.values(inventory).reduce((acc, ele) => {
  //     if (ele.bucketNumber == i) {
  //       acc[ele.itemName] = ele;
  //     }
  //     return acc;
  //   }, {});
  //   InventoryBuckets.push(<InventoryBucket key={`ib${i}`} bucket={bucket} bucketNumber={i} />);
  // }

  
  const bucket = Object.values(inventory).reduce((acc, ele) => {
        console.log('acc: ', acc)
        acc[ele.itemName] = ele;
        return acc;
  }, {});
  console.log('bucket:', bucket)
  InventoryBuckets.push(<InventoryBucket key={`ib${0}`} bucket={bucket} bucketNumber={0} />);
  


  function getRecipes() {
    // console.log("inv", inventory);
    axios
      .post('./api/recipes', inventory)
      .then((res) => {
        setRecipe(res.data);
        console.log('SUBMIT RECIPE', res.data);
        console.log(`Recipe retrieved from submit`);
      })
      .catch((e) => {
        console.log(`ERR: Recipe retrieval from submit is not working`);
      });
  }

  return (
    // three buckets with data passed down for each bucket
    <div className="inventoryContainer">
      {InventoryBuckets}
      <button onClick={getRecipes}>Submit</button>
    </div>
  );
}

export default InventoryContainer;
