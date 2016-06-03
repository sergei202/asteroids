'use strict';

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var WIDTH = ctx.canvas.width;
var HEIGHT = ctx.canvas.height;

var player = new Player();

function guideLines() {
	ctx.strokeStyle = 'gray';
	ctx.moveTo(WIDTH/2,0);
	ctx.lineTo(WIDTH/2,HEIGHT);
	ctx.moveTo(0, HEIGHT/2);
	ctx.lineTo(WIDTH, HEIGHT/2);
	ctx.stroke();
}


function drawGame() {
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	guideLines();
	player.update();
	player.draw();
}

setInterval(drawGame, 1000/60);









