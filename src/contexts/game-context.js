import React, {useState, useContext} from 'react';


const gameContext = React.createContext();



function Wrapper({children}) {
  
  const [state, setState] = useState(false);

  return (
    <gameContext.Provider value={{state, setState}}>
      {children}
    </gameContext.Provider>
  );
};

export const useGameContext = () => useContext(gameContext);


export default Wrapper;

