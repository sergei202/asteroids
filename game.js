'use strict';

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var WIDTH = ctx.canvas.width;
var HEIGHT = ctx.canvas.height;
/*
var angle = 0;
setInterval(function() {
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	guideLines();
	ctx.save();
	ctx.translate(WIDTH/2, HEIGHT/2);
	ctx.rotate(angle);
	ctx.strokeStyle = 'red';
	ctx.strokeRect(16, 16, 32,32);
	ctx.restore()
	angle += 0.01;
}, 10);*/

// return;


function guideLines() {
	ctx.strokeStyle = 'gray';
	ctx.moveTo(WIDTH/2,0);
	ctx.lineTo(WIDTH/2,HEIGHT);
	ctx.moveTo(0, HEIGHT/2);
	ctx.lineTo(WIDTH, HEIGHT/2);
	ctx.stroke();
}

var player = new Player(0,0);

var asteroids = [];
for(var i=0;i<5;i++) {
	asteroids.push(new Asteroid(-100 + 30*i, 100 + 30*i));
}

function gameLoop() {
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	guideLines();

	player.draw();
	player.update();
	handleKeys();
	asteroids.forEach(function(asteroid) {
		if(Sprite.isCollision(player, asteroid)) {
			console.log('COLLISION!');
			asteroid.dx *= -1;
			asteroid.dy *= -1;
		}

		asteroid.update();
		asteroid.draw();
	});
}

setInterval(gameLoop, 1000/60);

document.addEventListener('keydown', onKeyEvent);
document.addEventListener('keyup',   onKeyEvent);
var keys = {};
function onKeyEvent(event) {
// 	console.log('onKeyEvent: %o', event);
	if(event.type==='keydown')	keys[event.code] = true;
	if(event.type==='keyup')	keys[event.code] = false;
}

function handleKeys() {
	if(keys['ArrowRight']) player.x+=5;
	if(keys['ArrowLeft'])  player.x-=5;
	if(keys['ArrowUp'])    player.y+=5;
	if(keys['ArrowDown'])  player.y-=5;
}





