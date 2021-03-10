/**
 * This is React Hooks. This state management basically works like the store in Redux.
 */
import React, { useContext, useState } from 'react';

const InventoryContext = React.createContext();
const SetInventoryContext = React.createContext();

function useInventory() {
  return useContext(InventoryContext);
}
function useSetInventory() {
  return useContext(SetInventoryContext);
}

function InventoryProvider({ children }) {
  // console.log("children", children)
  const [inventory, setInventories] = useState({});

  function setInventory(newState) {
    setInventories(newState);
  }

  return (
    <InventoryContext.Provider value={inventory}>
      <SetInventoryContext.Provider value={setInventory}>{children}</SetInventoryContext.Provider>
    </InventoryContext.Provider>
  );
}

export { InventoryProvider, useInventory, useSetInventory };
