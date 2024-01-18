"use strict"

let flag = "bear-flag";

let counter = 9;

const squares = document.getElementsByClassName("square");

const squaresArray = Array.from(squares);

const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

const levels = document.querySelectorAll(".level");

const level_1 = document.getElementById("level_1");
const level_2 = document.getElementById("level_2");
const level_3 = document.getElementById("level_3");

const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");


const line1 = JudgLine(squaresArray,["a_1","a_2","a_3"]);
const line2 = JudgLine(squaresArray,["b_1","b_2","b_3"]);
const line3 = JudgLine(squaresArray,["c_1","c_2","c_3"]);
const line4 = JudgLine(squaresArray,["a_1","b_1","c_1"]);
const line5 = JudgLine(squaresArray,["a_2","b_2","c_2"]);
const line6 = JudgLine(squaresArray,["a_3","b_3","c_3"]);
const line7 = JudgLine(squaresArray,["a_1","b_2","c_3"]);
const line8 = JudgLine(squaresArray,["a_3","b_2","c_1"]);

const lineArray = [line1,line2,line3,line4,line5,line6,line7,line8];

const lineRandom = cornerLine(squaresArray,["a_1","a_3","c_1","c_3"]);

let winningLine = null;

const msgtxt1 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack!(computer turn)</p>';
const msgtxt2 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text">Whitebear Attack!(your turn)</p>';
const msgtxt3 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Peguins Win!!</p>';
const msgtxt4 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">Whitebear Win!!</p>';
const msgtxt5 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px><img src="img/penguins.jpg" width=61px height=61px></p><p class="text animate__bounceIn">Draw!!</p>'

let squaresBox = document.getElementById("squaresBox");
let gameSound = ["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/penwin_sound.mp3","sound/bearwin_sound.mp3","sound/draw_sound.mp3"];

window.addEventListener("DOMContentLoaded",
    function(){
        setMessage("bear-turn");
        squaresArray.forEach(function(square){
            square.classList.add("js-clickable");
        })
        LevelSetting(0);
    },false
)

let index;
levels.forEach((level)=>{
    level.addEventListener("click",()=>{
        index = [].slice.call(levels).indexOf(level);
        LevelSetting(index);
    })
})

function LevelSetting(index){
    level_1.classList.remove("level-selected");
    level_2.classList.remove("level-selected");
    level_3.classList.remove("level-selected");
    level_1.classList.remove("level-non-selected");
    level_2.classList.remove("level-non-selected");
    level_3.classList.remove("level-non-selected");

    if(sessionStorage.getItem("tic_tac_toe_access")){
        switch(index){
            case 0:
                sessionStorage.setItem("tic_tac_toe_access",1);
                level_1.classList.add("level-selected");
                level_2.classList.add("level-non-selected");
                level_3.classList.add("level-non-selected");
                break;
            case 1:
                sessionStorage.setItem("tic_tac_toe_access",2);
                level_2.classList.add("level-selected");
                level_1.classList.add("level-non-selected");
                level_3.classList.add("level-non-selected");
                break;
            case 2:
                sessionStorage.setItem("tic_tac_toe_access",3);
                level_3.classList.add("level-selected");
                level_1.classList.add("level-non-selected");
                level_2.classList.add("level-non-selected");
                break;
            default:
                level_1.classList.add("level-selected");
                level_2.classList.add("level-non-selected");
                level_3.classList.add("level-non-selected");
                break;
        }
    }else{
        sessionStorage.setItem("tic_tac_toe_access",1);
        level_1.classList.add("level-selected");
        level_2.classList.add("level-non-selected");
        level_3.classList.add("level-non-selected");
    }
}



squaresArray.forEach(function(square){
    square.addEventListener('click',() => {
        if(counter === 9){
            const levelBox = document.getElementById("levelBox");
            levelBox.classList.add("js-unclickable");
        }

        let gameOverFlg = isSelect(square);

        if(gameOverFlg === "0"){
            squaresBox.classList.add("js-unclickable");

            setTimeout(
                function(){
                    penTurn();
                },"2000"
            )
        }
    })
})

function isSelect(selectSquare){
    let gameOverFlg = "0";

    let winner = null;
    if(flag === "bear-flag"){
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");

        if(isWinner("bear")){
            setMessage("bear-win");
            gameOver("bear");
            return gameOverFlg = "1";
        }
        setMessage("pen-turn");
        flag = "pen-flag";
    }else{
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");

        if(isWinner("penguins")){
            setMessage("pen-win");
            gameOver("penguins");
            return gameOverFlg = "1";
        }

        setMessage("bear-turn");
        flag = "bear-flag";
    }

    counter--;

    if(counter === 0){
        setMessage("draw")
        gameOver("draw");
        return gameOverFlg = "1";
    }
    return gameOverFlg = "0";
}

function setMessage(id) {
    let msgElement = document.getElementById("msgtext"); 
    let messageHtml = "";
    switch (id) {
        case "bear-turn":
            messageHtml = msgtxt2; 
            break;
        case "pen-turn":
            messageHtml = msgtxt1; 
            break;
        case "bear-win":
            messageHtml = msgtxt4;
            break;
        case "pen-win":    
            messageHtml = msgtxt3;
            break;
        case "draw":
            messageHtml = msgtxt5; 
            break;
        default:
            messageHtml = msgtxt2; 
            break;
    }
    msgElement.innerHTML = messageHtml; 
}

function JudgLine(targetArray,idArray){
    return targetArray.filter(function(e){
        return(e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

function cornerLine(targetArray, idArray) {
    return targetArray.filter(element => idArray.includes(element.id));
}

const cornerElements = cornerLine(squaresArray, ["a_1", "a_3", "c_1", "c_3"]);
console.log(cornerElements);


function isWinner(symbol){
    const result = lineArray.some(function(line){
        const subResult = line.every(function(square){
            if(symbol === "bear"){
                return square.classList.contains("js-bear-checked");
            }
            if(symbol === "penguins"){
                return square.classList.contains("js-pen-checked");
            }
        })

        if(subResult){
            winningLine = line
        }
        return subResult;
    })
    return result
}

function gameOver(status){
    let w_sound;
    switch(status){
        case "penguins":
            w_sound = gameSound[2];
            break;
        case "bear":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }

    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();

    squaresBox.classList.add("js-unclickable");

    newgamebtn_display.classList.remove("js-hidden");

    if(status === "penguins"){
        if(winningLine){
            winningLine.forEach(function(square){
                square.classList.add("js-pen_highLight")
            })
        }

        $(document).snowfall({
            flakeColor:"rgb(255,240,245)",
            maxSpeed:3,
            minSpeed:1,
            maxSize:20,
            minSize:10,
            round:true
        })
    }else if(status === "bear"){
        if(winningLine){
            winningLine.forEach(function(square){
                square.classList.add("js-bear_highLight")
            })
        }

        $(document).snowfall({
            flakeColor:"rgb(175,238,238)",
            maxSpeed:3,
            minSpeed:1,
            maxSize:20,
            minSize:10,
            round:true
        })
    }
}

newgamebtn.addEventListener("click",function(e){
    flag = "bear-flag";
    counter = 9;
    winningLine = null;

    squaresArray.forEach(function(square){
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highLight");
        square.classList.remove("js-bear_highLight");
        square.classList.add("js-clickable");
    })

    levelBox.classList.remove("js-unclickable");
    squaresBox.classList.remove("js-unclickable");

    setMessage("bear-turn");
    newgamebtn_display.classList.add("js-hidden");

    $(document).snowfall("clear");
})

function penTurn() {
    let level = sessionStorage.getItem("tic_tac_toe_access");

    let penTurnEnd = "0";
    let gameOverFlg = "0";

    while(penTurnEnd === "0"){
        if(level === "1" || level === "2" || level === "3"){
            penTurnEnd = isReach("penguins");
            if(penTurnEnd === "1"){
                gameOverFlg = "1";
                break;
            }
        }
        
        if(level === "2" || level === "3"){
            penTurnEnd = isReach("bear");
            if(penTurnEnd === "1"){
                break;
            }
        }

        if(level === "3"){
            const centerSquare = document.getElementById("b_2");
            if(centerSquare.classList.contains("js-clickable")){
                gameOverFlg = isSelect(centerSquare);
                penTurnEnd = "1";
                break;
            }
            
            for(let square of lineRandom){
                if(square.classList.contains("js-clickable")){
                    gameOverFlg = isSelect(square);
                    penTurnEnd = "1";
                    break;
                }
            }
            if(penTurnEnd === "1") 
                break;
        }

        const penSquare = squaresArray.filter(function(square) {
            return square.classList.contains("js-clickable");
        });
    
        var n = Math.floor(Math.random() * penSquare.length);
    
        gameOverFlg = isSelect(penSquare[n]);

        break;
    }

    if (gameOverFlg === "0") {
        squaresBox.classList.remove("js-unclickable");
    }

    return gameOverFlg;
}

function isReach(status){
    let penTurnEnd = "0";

    lineArray.some(function(line){
        let penCheckCnt = 0;
        let bearCheckCnt = 0;

        line.forEach(function(square){
            if (square.classList.contains("js-pen-checked")) {
                penCheckCnt++;
            }
            if (square.classList.contains("js-bear-checked")) {
                bearCheckCnt++;
            }

        })

        if(status === "penguins" && penCheckCnt === 2 && bearCheckCnt === 0){
            penTurnEnd = "1";
        }

        if(status === "bear" && penCheckCnt === 0 && bearCheckCnt === 2){
            penTurnEnd = "1";
        }

        if(penTurnEnd === "1"){
            const clickableSquare = line.find(square => square.classList.contains("js-clickable"));
            if(clickableSquare){
                isSelect(clickableSquare);
                return true; 
            }
        }
    });

    return penTurnEnd;
}

