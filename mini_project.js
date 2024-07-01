let gameSeq = [];
let userSeq = [];

let start = false;
let level = 0;

// home work : keep track of hightest score
highestScore = 0;

// to start the game
document.addEventListener("keypress", startGame);

let h2 = document.querySelector("h2");
function startGame() {
    if (start == false) {
        start = true;

        levelUp();
    }
}
// end


function levelUp() {
    level++;
    h2.innerText = `level ${level}`;

    // button flash
    // step1 - choose random button
    let btns = ["red", "yellow", "green", "blue"];
    let random_index = Math.floor(Math.random() * 4);
    let random_color = btns[random_index];
    let btn = document.querySelector(`.${random_color}`);

    // step 2 - flash btn
    flashBtn(btn);

    // add in sequence
    gameSeq.push(random_color);

    // reset user input
    userSeq = [];
}

function flashBtn(btn) {

    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}
// end

// when button is clicked, do the work
allBtns = document.querySelectorAll(".btn");
// WRONG : allBtns.addEventListener("click", btnPressed);
for(btn of allBtns){
    btn.addEventListener("click", btnPressed)
}

function btnPressed() {
    let btn = this;
    flashBtn(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        //  home work
        if(level > highestScore){
            highestScore = level-1;
        }

        h2.innerHTML = `game over! Your score is <b>${level-1}</b>
        <br> Press any key to restart
        <br> Highest score is : ${highestScore}`;
        reset();

        // extra visual effect
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor="white";
         }, 150);
    }
}

function reset(){
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}