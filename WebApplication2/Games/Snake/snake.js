﻿const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
// declare modal
let modal = document.getElementById("popup1");
// close icon in modal
let closeicon = document.querySelector(".close");
let level = 0;
// create the unit
const box = 32;

// load images

const ground = document.getElementById("ground");

const foodImg = document.getElementById("food");

// load audio files

/*const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = document.getElementById("dead");
eat.src = document.getElementById("eat");
up.src = document.getElementById("up");
left.src = document.getElementById("left");
right.src = document.getElementById("right");
down.src = document.getElementById("down");
*/

// create the snake

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// create the food

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

// create the score var

let score = 0;

// control the snake

document.addEventListener("keydown", direction);

let d;

function direction(event) {
    if (event.keyCode === 37 && d !== "RIGHT") {
        d = "LEFT";
       // left.play();
    }
    else if (event.keyCode === 38 && d !== "DOWN") {
        d = "UP";
        //up.play();
    }
    else if (event.keyCode === 39 && d !== "LEFT") {
        d = "RIGHT";
        //right.play();
    }
    else if (event.keyCode === 40 && d !== "UP") {
        d = "DOWN";
        //down.play();
    }
}

// check collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw() {
    modal.classList.remove("show");

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if (d === "LEFT") snakeX -= box;
    if (d === "UP") snakeY -= box;
    if (d === "RIGHT") snakeX += box;
    if (d === "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        //eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new head

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // game over
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box
        || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        //dead.play();
        // show congratulations modal
        modal.classList.add("show");
        //closeicon on modal
        closeModal();
    }
    if (score > level) {
        level++;
        modal.classList.add("show");
        draw();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// call the draw function every 100 ms

let game = setInterval(draw, 100);

// @description close icon on modal
function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
        draw();
    });
}


// @desciption for user to play Again 
function playAgain() {
    modal.classList.remove("show");
    draw();
}

function nextLevel() {
    level++;
    modal.classList.remove("show");
    draw();
}
