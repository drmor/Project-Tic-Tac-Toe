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

    const getPlayersValue = () =>{
        const form = document.querySelector(".hero");
        const closeWindow = () =>{
            if (players.length === 2){
                form.style.display = "none";
            };
        };
        const playerOneValue = () =>{
            const inputP1 = document.getElementById("p1");
            const playerOneName = inputP1.value;
            players.push(p1 = createPlayer(playerOneName, "X"));
            closeWindow();
        };
        const playerTwoValue = () =>{
            const inputP2 = document.getElementById("p2");
            const playerTwoName = inputP2.value;
            players.push(p1 = createPlayer(playerTwoName, "O"));
            closeWindow();
        };
        document.getElementById("BtnP1").addEventListener("click", playerOneValue, { once: true });
        document.getElementById("BtnP2").addEventListener("click", playerTwoValue, { once: true });
    };

    const changePlayer = () =>{
        activePlayer = activePlayer === 0 ? 1 : 0;
    };
    const getMark = () =>{
        let position = parseInt(prompt(`index for ${players[activePlayer].name}`));
        const availableCheck = () =>{
            if (gameBoard.board[position] === " "){
            gameBoard.setMark(position, players[activePlayer].mark);
            } else {
                alert("place taken");
                getMark();
            };
        };
        availableCheck();
    };
    const playRound = () =>{
        let winPoint = 0;
        let drawPoint = 0;
        let winner;
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8]
        ];
        const checkWin = () =>{
            for(let n = 0; n < winPatterns.length; n++){
                let pattern = winPatterns[n];
                let a = pattern[0];
                let b = pattern[1];
                let c = pattern[2];
                if (gameBoard.board[a] === gameBoard.board[b] && 
                    gameBoard.board[b] === gameBoard.board[c] && 
                    gameBoard.board[a] !== " "){
                    winPoint += 1;
                    console.log('X win');
                } else if (!gameBoard.board.includes(" ")){
                    if (n < 1){
                        console.log('draw');
                    };
                };
            };
        };
        for (let i = 0; i < 1; i++){
            if (winPoint === 1){
                console.log(`game ended`);
                break;
            } else {
                getMark();
                changePlayer();
                gameBoard.getBoard();
                checkWin();
                console.log(" ");
            };
        };
    };
    return{players, changePlayer, getMark, playRound, getPlayersValue};
})();
const screenController  = (function(){
    const updateScreen = () =>{
        if (gameController.players.length === 2){
            document.body.innerHTML = "";
        }
        const container = document.createElement("div");
        document.body.appendChild(container);
        container.classList.add('container');
        for (let i = 0; i < gameBoard.board.length; i++){
            const gridElement = document.createElement("div");
            gridElement.classList.add('gridItem');
            gridElement.setAttribute("data-index", i)
            gridElement.textContent = gameBoard.board[i];
            container.appendChild(gridElement);
        };
        const gridItems = document.querySelectorAll('.gridItem');
        gridItems.forEach(item =>{
            item.addEventListener('click', () => {
                gameBoard.setMark(item.dataset.index, "+")
                updateScreen();
            });
        });
    };
    /* for (let b = 0; b < 3; b++){
        gameController.playRound();
    } */
    
    return{updateScreen};
})();
gameController.getPlayersValue();
screenController.updateScreen();