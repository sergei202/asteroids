'use strict';

var player = new Player();

var bullets = [];
var asteroids = [];
var hits = 0;
var running = true;

var game = {
	ctx: null,
	width: 0,
	height: 0,
	mouse: {x:300,y:0, button:0},
	init: function() {
		var self = this;
		var canvas = document.getElementById('game');
		this.ctx = canvas.getContext('2d');
		this.width = canvas.width;
		this.height = canvas.height;

		this.draw();

		canvas.addEventListener('mousemove', function(e) {
			var rect = canvas.getBoundingClientRect();
			self.mouse.x = e.clientX - rect.left;	// - self.width/2;
			self.mouse.y = e.clientY - rect.top;	// - self.height/2;
// 			console.log('mouse: %o,%o', self.mouse.x,self.mouse.y);
		});
		canvas.addEventListener('mousedown', function(e) {
// 			console.log('mousedown %o', e);
			if(e.buttons===1) player.fire();
			self.mouse.button = e.buttons;
		});
		canvas.addEventListener('mouseup', function(e) {
// 			console.log('mouseup %o', e);
			self.mouse.button = e.buttons;
		});

		this.loop();
	},

	loop: function() {
		var self = this;
		self.draw();
		self.update();
		if(running) requestAnimationFrame(function() {self.loop();});
	},

	update: function() {
		var self = this;
		player.angle = (this.mouse.x)/70;
// 		player.x = this.mouse.x;
// 		if(this.mouse.button===1) player.fire();
// 		if(this.mouse.button===2) player.y++;

		asteroids = asteroids.filter(a => a.active);
		for(var i=asteroids.length;i<16;i++) asteroids.push(new Asteroid());
		asteroids.forEach(a => a.update());
		bullets = bullets.filter(a => a.active);
		bullets.forEach(function(bullet) {
			bullet.update();
			asteroids.forEach(function(asteroid) {
				if(isCollision(bullet,asteroid)) {
					asteroid.destroy();
					bullet.active = false;
					hits++;
				}
			});
		});
		asteroids.forEach(function(asteroid) {
			if(isCollision(asteroid,player)) {
				self.ctx.fillStyle = 'red';
				self.ctx.font = '40px serif';
				self.ctx.fillText('GAME OVER', 180,150);
				running = false;
			}
		});
	},

	draw: function() {
// 		this.ctx.strokeStyle = '#ccc';
		this.ctx.clearRect(0,0, this.width,this.height);
// 		this.ctx.beginPath();
// 		this.ctx.moveTo(0,this.height/2);
// 		this.ctx.lineTo(this.width, this.height/2);
// 		this.ctx.moveTo(this.width/2, 0);
// 		this.ctx.lineTo(this.width/2, this.height);
// 		this.ctx.closePath();
// 		this.ctx.stroke();

		asteroids.forEach(a => a.draw(this.ctx));
		bullets.forEach(a => a.draw(this.ctx));
		player.draw(this.ctx);

		this.ctx.font = '12px serif';
		this.ctx.fillText('asteroids: '+asteroids.length, 2,10);
		this.ctx.fillText('bullets: '+bullets.length, 2,20);
		this.ctx.fillText('hits: '+hits, 2,30);
	}
};

function isCollision(a,b) {
	return a.x <= b.x + b.width &&
		a.x + a.width >= b.x &&
		a.y <= b.y + b.height &&
		a.y + a.height >= b.y;
}



document.addEventListener('DOMContentLoaded', function() {
	game.init();
});
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

window.game = game;
// window.player = player;

