const gameBoard = (function (){
    let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    const setMark = (index, mark) =>{
        if (index >= 0 && index <= 8){
            board[index] = mark;
        };
    };
    return {
        board,
        setMark,
    };
})();

function createPlayer(name, mark){
    return {name, mark};
};

const gameController = (function(){
    let players = [];
    let activePlayer = 0;
    let winnerFound = false;
    let draw = false;

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
    const getWin = () => {return winnerFound};
    const getDraw = () => {return draw};
    const playRound = () =>{
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
                    winnerFound = true;
                    
                } else if (!gameBoard.board.includes(" ") && winnerFound === false){
                    draw = true;
                    return draw;
                };
            };
            if (winnerFound === true || draw === true){
                screenController.gridContainer.style.pointerEvents = "none";
            }
        };

        const gridItems = document.querySelectorAll('.gridItem');
        gridItems.forEach(item =>{
            if (gameBoard.board[item.dataset.index] === " "){
                    item.addEventListener('click', () => {
                    gameBoard.setMark(item.dataset.index, players[activePlayer].mark);
                    checkWin();
                    changePlayer();
                    screenController.displayContent(activePlayer);
                    screenController.updateScreen();
                });
            };
        });
        return {checkWin};
    };
    return{players, activePlayer, changePlayer, playRound, getPlayersValue, getWin, getDraw};
})();

const screenController  = (function(){
    const nextRoundBtn = document.getElementById("next")
    nextRoundBtn.addEventListener("click", () =>{
        console.log(gameController.getWin());
    });
    const gridContainer = document.querySelector(".gridContainer");
    const displayContent = (change) =>{
        const turn = document.querySelector(".turn");
        if (gameController.players.length === 2){
            turn.textContent = "";
            turn.textContent = "Player: " + gameController.players[change].name + " turn";
        }
        const displayWin = () =>{
            let win = gameController.getWin();
            let draw = gameController.getDraw();
            if (win === true){
                turn.textContent = "";
                turn.textContent = `Player: ${gameController.players[change].name} won!`;//срабатывает замена игрока и побеждает другой игрок
            } else if (draw === true){
                turn.textContent = "";
                turn.textContent = "Draw!";
            }
        };
        displayWin();
    };
    const updateScreen = () =>{
        if (gameController.players.length === 2){
            gridContainer.innerHTML = "";
        }
        const container = document.createElement("div");
        gridContainer.appendChild(container);
        container.classList.add('container');
        for (let i = 0; i < gameBoard.board.length; i++){
            const gridElement = document.createElement("div");
            gridElement.classList.add('gridItem');
            gridElement.setAttribute("data-index", i)
            gridElement.textContent = gameBoard.board[i];
            container.appendChild(gridElement);
        };
        gameController.playRound();
    };
    
    return{gridContainer, updateScreen, displayContent};
})();
gameController.getPlayersValue();
screenController.updateScreen();
