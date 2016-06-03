'use strict';

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var WIDTH = ctx.canvas.width;
var HEIGHT = ctx.canvas.height;


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
for(var i=0;i<10;i++) {
	asteroids.push(new Asteroid(45*i, 45*i));
}

function drawGame() {
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	guideLines();

	player.draw();
	player.update();

	asteroids.forEach(function(asteroid) {
		asteroid.update();
		asteroid.draw();
	});
}

setInterval(drawGame, 1000/60);

document.addEventListener('keydown', onKeyEvent);
function onKeyEvent(event) {
	console.log('onKeyEvent: %o', event.key);
}







