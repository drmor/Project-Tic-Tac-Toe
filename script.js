const gameBoard = (function (){
    let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    const getBoard = () =>{
    for (let i = 0; i < 9; i += 3){
        console.log(" " + board[i] + " | " + board[i + 1] + " | " + board[i + 2])
            if (i < 6) {
                console.log("---+---+---");
            };
        };
    };
    const setMark = (index, mark) =>{
        if (index >= 0 && index <= 8){
            board[index] = mark;
        };
    };
    return {
        board,
        getBoard,
        setMark,
    };
})();

function createPlayer(name, mark){
    return {name, mark};
};

const gameController = (function(){
    let players = [];
    let activePlayer = 0;
    players.push(p1 = createPlayer("p1", "X"));
    players.push(p2 = createPlayer("p2", "O"));

    const changePlayer = () =>{
        activePlayer = activePlayer === 0 ? 1 : 0;
    };
    const getMark = () =>{
        let position = parseInt(prompt(`index for ${players[activePlayer].name}`));
        if (gameBoard.board[position] === " "){
            gameBoard.setMark(position, players[activePlayer].mark);
        } else {
            alert("place taken")
            getMark();
        }
        return position;
    };
    for (i = 0; i < 3; i++){
        getMark();
        changePlayer();
        gameBoard.getBoard();
        console.log(" ");
    };
    return{changePlayer, getMark}
})();