var cvs = document.getElementById("snake");
var ctx = cvs.getContext("2d");
var again = document.getElementById("again");

//create unit
var box = 32;
var paused = false;
var count=0;
//load images
var ground = new Image();
ground.src = "img/ground.png";

var foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

var snake = [];
snake[0] = {
	x: 9*box,
	y: 10*box
};


//create the food
var food = {
	x: Math.floor(Math.random()*17+1) * box,
	y: Math.floor(Math.random()*15+3) * box
};

//create score variable
var score = 0;

//control the snake
var d;
document.addEventListener("keydown", direction);

function direction(event){
	var key= event.keyCode;
	if(key == 37 && d!="RIGHT"){
		left.play();
		d = "LEFT";
	}
	else if(key == 38 && d!="DOWN"){
		up.play();
		d = "UP";
	}
	else if(key == 39 && d!="LEFT"){
		right.play();
		d = "RIGHT";
	}
	else if(key == 40 && d!="UP"){
		down.play();
		d = "DOWN";
	}
	else if(key == 80){
		paused = !paused;
		count++;
	}
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}



//draw everything to the canvas
function draw(){

	if(paused){
		return;
	}

	ctx.drawImage(ground,0,0);

	for(var i=0; i<snake.length; i++)
	{
		ctx.fillStyle = (i==0)? "green" : "white";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);

		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.drawImage(foodImg, food.x, food.y);

	//old head position
	var snakeX = snake[0].x;
	var snakeY = snake[0].y;
	
	//which direction
	if(d=="LEFT")
		snakeX -= box;
	if(d=="UP")
		snakeY -= box;
	if(d=="RIGHT")
		snakeX += box;
	if(d=="DOWN")
		snakeY += box;

	//if the snake eats the food
	if(snakeX==food.x && snakeY==food.y){
		score++;
		eat.play();
		food = {
			x: Math.floor(Math.random()*17+1) * box,
			y: Math.floor(Math.random()*15+3) * box
    	};	
	}else{
		snake.pop();
	}

	//add new head
	var newHead = {
		x: snakeX,
		y: snakeY
	};

	// game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
        ctx.fillStyle = "green";
        ctx.font = "80px Arial";
		ctx.fillText("GAME OVER", 2*box, 11*box);
    }

	snake.unshift(newHead);

	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score, 2*box, 1.6*box);
	
}

again.addEventListener("click",function(){
	// location.reload();
	snake[0] = {
	x: 9*box,
	y: 10*box
	};	

	food = {
		x: Math.floor(Math.random()*17+1) * box,
		y: Math.floor(Math.random()*15+3) * box
	};
	score=0;
	draw();
});
//call darw function every 100ms
var game = setInterval(draw,80);





