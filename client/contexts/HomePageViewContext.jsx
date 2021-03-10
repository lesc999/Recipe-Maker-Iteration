/**
 * This is React Hooks. This state management basically works like the store in Redux.
 */
import React, { useContext, useState } from 'react';

const HomePageViewContext = React.createContext();
const SetHomePageViewContext = React.createContext();

function useHomePageView() {
  return useContext(HomePageViewContext);
}
function useSetHomePageView() {
  return useContext(SetHomePageViewContext);
}

function HomePageViewProvider( { children } ) {

  const [homePageView, setHomePageViews] = useState(true);

  function setHomePageView(newState) {
    setHomePageViews(newState);
  }

  return (
    <HomePageViewContext.Provider value={homePageView}>
      <SetHomePageViewContext.Provider value={setHomePageView}>{children}</SetHomePageViewContext.Provider>
    </HomePageViewContext.Provider>
  );
}

export { HomePageViewProvider, useHomePageView, useSetHomePageView };