let bird = document.getElementById("bird");
let game = document.getElementById("game");
let scoreText = document.getElementById("score");

let birdY = 250;
let velocity = 0;

let gravity = 0.5;
let jump = -8;

let score = 0;
let playing = true;

let pipes = [];


// CHIM RƠI
function updateBird() {

    velocity += gravity;
    birdY += velocity;

    bird.style.top = birdY + "px";

    if (birdY <= 0 || birdY >= 555) {
        gameOver();
    }
}


// CHIM BAY
function fly() {

    if (playing) {
        velocity = jump;
    }
}


// TẠO ỐNG
function createPipe() {

    if (!playing) return;

    let gap = 170;

    let topHeight = Math.floor(Math.random() * 250) + 50;

    let bottomHeight = 600 - topHeight - gap;


    let topPipe = document.createElement("div");

    topPipe.className = "pipe";

    topPipe.style.height = topHeight + "px";
    topPipe.style.top = "0";
    topPipe.style.left = "400px";


    let bottomPipe = document.createElement("div");

    bottomPipe.className = "pipe";

    bottomPipe.style.height = bottomHeight + "px";
    bottomPipe.style.bottom = "0";
    bottomPipe.style.left = "400px";


    game.appendChild(topPipe);
    game.appendChild(bottomPipe);


    pipes.push({
        x: 400,
        top: topPipe,
        bottom: bottomPipe,
        scored: false
    });
}


// DI CHUYỂN ỐNG
function updatePipes() {

    for (let i = pipes.length - 1; i >= 0; i--) {

        let pipe = pipes[i];

        pipe.x -= 3;

        pipe.top.style.left = pipe.x + "px";
        pipe.bottom.style.left = pipe.x + "px";


        // CỘNG ĐIỂM
        if (pipe.x < 80 && !pipe.scored) {

            score++;

            scoreText.innerText = score;

            pipe.scored = true;
        }


        // XÓA ỐNG
        if (pipe.x < -60) {

            pipe.top.remove();
            pipe.bottom.remove();

            pipes.splice(i, 1);

            continue;
        }


        checkCollision(pipe);
    }
}


// KIỂM TRA VA CHẠM
function checkCollision(pipe) {

    let birdLeft = 80;
    let birdRight = 125;

    let birdTop = birdY;
    let birdBottom = birdY + 45;

    let pipeLeft = pipe.x;
    let pipeRight = pipe.x + 60;


    if (birdRight < pipeLeft || birdLeft > pipeRight) {
        return;
    }


    let topHeight = parseInt(pipe.top.style.height);

    let bottomHeight = parseInt(pipe.bottom.style.height);


    if (birdTop < topHeight) {
        gameOver();
    }


    if (birdBottom > 600 - bottomHeight) {
        gameOver();
    }
}


// GAME OVER
function gameOver() {

    if (!playing) return;

    playing = false;

    document.getElementById("finalScore").innerText = score;

    document.getElementById("gameOver").style.display = "block";
}


// CHƠI LẠI
function restart() {

    for (let pipe of pipes) {

        pipe.top.remove();
        pipe.bottom.remove();

    }

    pipes = [];

    birdY = 250;
    velocity = 0;

    score = 0;

    scoreText.innerText = "0";

    playing = true;

    document.getElementById("gameOver").style.display = "none";
}


// CLICK CHUỘT
game.addEventListener("click", function () {
    fly();
});


// PHÍM SPACE
document.addEventListener("keydown", function (event) {

    if (event.code === "Space") {

        event.preventDefault();

        fly();
    }

});


// TẠO ỐNG NGAY SAU 1 GIÂY
setTimeout(function () {
    createPipe();
}, 1000);


// SAU ĐÓ CỨ 2 GIÂY TẠO ỐNG
setInterval(function () {
    createPipe();
}, 2000);


// VÒNG LẶP GAME
function gameLoop() {

    if (playing) {

        updateBird();

        updatePipes();

    }

    requestAnimationFrame(gameLoop);
}

gameLoop();