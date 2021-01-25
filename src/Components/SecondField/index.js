import React,{useState} from 'react';
import {useGameContext} from '../../contexts/game-context';
import "./index.css";



function SecondField() {
  const { state, setState } = useGameContext();

  const number = 1;
  
  return (
    <div className="second-field">
      <div className="main-field">
        <h3>
        Билет {number}
        </h3>
        <span>{state ? 'Вы выиграли 🎉!!!' : 'Вы ничего не выиграли (пока)'}</span>
      </div>
    </div>
  );
}

  export default SecondField;
