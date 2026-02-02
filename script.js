const gameBoard = (function (){
    const board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    const getBoard = () =>{
    for (let i = 0; i < 9; i += 3){
        console.log(" " + board[i] + " | " + board[i + 1] + " | "+ board[i + 2])
            if (i < 6) {
                console.log("---+---+---");
            };
        };
    };
    const setMark = (index, mark) =>{
        if (index >= 0 && index <= 8){
            board[index] = mark;
        }
    }
    for (let n = 0; n < 3; n++){
        setMark(prompt("index"), prompt("mark"))
        getBoard();
        if (n < 2){
            console.log("next player turn")
        }
    };
})();

function createPlayer(name, mark){
    return {name, mark};
};

function game(){
    const p1 = createPlayer("p1", "X");
    const p2 = createPlayer("p2", "O");

    
}