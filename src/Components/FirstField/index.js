import React,{useState} from 'react';
import {useGameContext} from '../../contexts/game-context';
import "./index.css";



function FirstField() {
  
  const[firstFieldNumbers, setFirstFieldNumbers] = useState([]);
  const[secondFieldNumber, setSecondFieldNumbers] = useState();
  const { state, setState } = useGameContext();
  
  function generateNumbers(){
    const firstField = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
    const secondField = Math.floor((1 + Math.random() * 2));
    let firstFieldRes = [];
    let j, temp;
      for(let i = firstField.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = firstField[j];
        firstField[j] = firstField[i];
        firstField[i] = temp;
        }
    firstFieldRes = firstField.slice(0,8)
    return [firstFieldRes, secondField];
  };
  
  function isWon(){
    const arrGeneateNumbers = generateNumbers();
    const firstMatchFields = firstFieldNumbers.filter((el)=> arrGeneateNumbers[0].includes(el));
    const secondMatchFields = secondFieldNumber === arrGeneateNumbers[1];
    let res = firstMatchFields.length + secondMatchFields >= 4
    setState(res);
    alert(res? 'Ура! поздравляем!': 'Упс! Не повезло!')
  };

  
  function handlerClick(){
    isWon();
    fetch('http://finch-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        SelectedNumber:{
        firstField: firstFieldNumbers,
        secondField: secondFieldNumber,
        },
        isTicketWon: state
      }),
    })
    .then(response => response.status !== 200 ? alert('something wrong!') : console.log('OK'));
}
  
function numberFirstHandler(ev){
    setFirstFieldNumbers(prevValue => [...prevValue, Number(ev.target.innerText)]);
    ev.target.className = ev.target.className ==='game_number selected'?'game_number':'game_number selected';
    
  }
  function numberSecondHandler(ev){
    setSecondFieldNumbers(Number(ev.target.innerText));
    ev.target.className = ev.target.className ==='game_number selected'?'game_number':'game_number selected';
  }
  //в будущем можно реализовать логику счетчика билетов, подцепив базу, а пока хардкод
  const number = 1;
  
  return (
    <div className="first-field">
      <div className="first-field__area">
      <div className="main-field-first">
      <h3 className="main-field__header">
        Билет {number}
      </h3>
      <p className="main-field__text">
        Первая часть поля
      </p> 
      <span className="main-field__description">
        Отметьте 8 чисел без повторений
      </span> 
      <div className="main-field__numberpanel" onClick={numberFirstHandler}>
        <b className="game_number">1</b>
        <b className="game_number">2</b>
        <b className="game_number">3</b>
        <b className="game_number">4</b>
        <b className="game_number">5</b>
        <b className="game_number">6</b>
        <b className="game_number">7</b>
        <b className="game_number">8</b>
        <b className="game_number">9</b>
        <b className="game_number">10</b>
        <b className="game_number">11</b>
        <b className="game_number">12</b>
        <b className="game_number">13</b>
        <b className="game_number">14</b>
        <b className="game_number">15</b>
        <b className="game_number">16</b>
        <b className="game_number">17</b>
        <b className="game_number">18</b>
        <b className="game_number">19</b>
        <b className="game_number">20</b>
      </div>
      </div> 
      <div className="extra_field">
        <p className="extra_field__text">Вторая часть поля</p>
        <span className="extra-field__description">Отметьте 1 число</span>
        <div className="extra_field__numberpanel" onClick={numberSecondHandler}>
          <b className="game_number">1</b>
          <b className="game_number">2</b>
        </div>
        <b className="btn btn--main" onClick={handlerClick}>Узнать результат</b>
			</div>
      </div>
    </div>
  )
}

export default FirstField
