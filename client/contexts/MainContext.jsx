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

  const [homePageView, setHomePageView] = useState(false);

  function set


}