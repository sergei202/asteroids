'use strict';

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var WIDTH = ctx.canvas.width;
var HEIGHT = ctx.canvas.height;

function guideLines() {
	ctx.strokeStyle = '#aaa';
	ctx.moveTo(WIDTH/2,0);
	ctx.lineTo(WIDTH/2,HEIGHT);
	ctx.moveTo(0, HEIGHT/2);
	ctx.lineTo(WIDTH, HEIGHT/2);
	ctx.stroke();
}

var player = new Player(0,0);

var asteroids = [];

function generateAsteroids() {
	for(var i=asteroids.length;i<8;i++) {
		var asteroid = new Asteroid(WIDTH/2 + Math.random()*WIDTH/2, Math.random()*HEIGHT - HEIGHT/2);
		asteroid.dx = -2;
		asteroid.dy = 0;
		asteroids.push(asteroid);
	}
}


var isRunning = true;
var score = 0;

function gameLoop() {
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	guideLines();

	generateAsteroids();

	player.draw();
	player.update();

	player.bullets.forEach(function(bullet) {
		bullet.draw();
		bullet.update();
	});

	handleKeys();
	asteroids = asteroids.filter(function(asteroid) {
		return asteroid.active;
	});
	player.bullets = player.bullets.filter(function(bullet) {
		return bullet.active;
	});

	asteroids.forEach(function(asteroid) {
		// Check collision between player and asteroids
		if(Sprite.isCollision(player, asteroid)) {
			console.log('COLLISION!');
			isRunning = false;
		}
		// Check collision between bullets and asteroids
		player.bullets.forEach(function(bullet) {
			if(Sprite.isCollision(asteroid, bullet)) {
				console.log('Bye bye Asteroid');
				asteroid.active = false;
				bullet.active = false;
				score++;
			}
		});

		asteroid.update();
		asteroid.draw();
	});


	ctx.strokeColor = 'gray';
	ctx.font = '20px serif';
	ctx.strokeText('Score: ' + score, 2,20);

	if(isRunning) requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

document.addEventListener('keydown', onKeyEvent);
document.addEventListener('keyup',   onKeyEvent);
var keys = {};
function onKeyEvent(event) {
// 	console.log('onKeyEvent: %o', event);
	if(event.type==='keydown')	keys[event.code] = true;
	if(event.type==='keyup')	keys[event.code] = false;
}

function handleKeys() {
	if(keys['ArrowRight']) player.angle += 0.1;
	if(keys['ArrowLeft'])  player.angle -= 0.1;
	if(keys['ArrowUp'])    player.move(2);
	if(keys['ArrowDown'])  player.move(-2);
	if(keys['Space']) {
		player.fire();
		keys['Space'] = false;
	}
}





