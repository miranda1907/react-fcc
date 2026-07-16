const { useState } = React;

export function Board() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);
  const [draw,setDraw] = useState(false);

  const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  function handleClick(i) {
    if (winner || draw) return;

    const buttonArray = [...board];

    if (buttonArray[i] !== null) return;

   buttonArray[i] = turn;
   setBoard(buttonArray);

   const hasWinner= winningCombinations.some(combination => combination.every(el => buttonArray[el] === turn ));
   if (hasWinner) {
    setWinner(turn); 
    return
    };

   const isDraw = buttonArray.every(el => el !== null);
   if (isDraw) {
    setDraw(true);
    return;
   }
   
   setTurn(turn === 'X' ? 'O' : 'X');

  }

  function handleReset() {
    setBoard(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
    setDraw(false);
  }

return <div>
<div className="board">
{board.map(
  (value, index) => 
  <button className="square" 
  onClick={()=> {handleClick(index)}} 
  key={index}>
  {value}
  </button>
)}
</div>
{winner && 
<p>Winner: {winner}</p>
}
{draw && 
<p>It's a draw!</p>
}
<button id="reset" 
onClick={handleReset}>
Reset Game
</button>

</div>
}
