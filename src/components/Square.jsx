
import img1 from "../images/O.png"
import img2 from "../images/game_X.png"




function Square( {value, onSquareClick, isWinningSquare} ) {

    let content;
    if (value === 'X'){
        content = <img src={img2} alt="X" wdtih={80} height={80}/>;
    } else if( value === 'O'){
        content = <img src={img1} alt="O" wdtih={80} height={80}/>;
    } else    {
        content = null;
    }

    return (
        <button 
            className={`square ${isWinningSquare ? "winning-square" : ""}`}
            onClick={onSquareClick}
        >
            {content}
        </button>
    );
}

export default Square