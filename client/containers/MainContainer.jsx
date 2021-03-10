import React from 'react';
import InventoryContainer from './InventoryContainer';
import RecipesContainer from './RecipesContainer';
import { InventoryProvider } from '../contexts/InventoryContexts';
import { RecipeProvider } from '../contexts/RecipeContext';
import { useHomePageView } from '../contexts/HomePageViewContext';

function MainContainer() {

  const homePageView = useHomePageView()

  if (homePageView) {
    return (
      <div style={{ display: 'flex' }}>
        <InventoryProvider>
          <RecipeProvider>
            <InventoryContainer />
           
          </RecipeProvider>
        </InventoryProvider>
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex' }}>
        <InventoryProvider>
          <RecipeProvider>
            <InventoryContainer />
            <RecipesContainer />
          </RecipeProvider>
        </InventoryProvider>
      </div>
    );
  }

}

export default MainContainer;
