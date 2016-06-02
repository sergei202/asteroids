'use strict';

class Game {
	constructor(w,h) {
		this.initCanvas(w,h);
		this.initSprites();
		this.startLoop();
	}

	initCanvas(w,h) {
		this.canvas = document.getElementsByTagName('canvas')[0];
		this.canvas.width = w;
		this.canvas.height = h;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.width = w;
		this.ctx.height = h;
	}

	initSprites() {
		this.sprites = [];
// 		for(var i=0;i<32;i++) {
// 			this.sprites.push(new Sprite(this.ctx, 200 + Math.sin(i/5)*100, 200 + Math.cos(i/5)*100, 4,4));
// 		}
		this.player = new Player(this.ctx, 0,0);
		this.sprites.push(this.player);
		
// 		this.sprites.push(new Asteroid(this.ctx, -100,0));
// 		this.sprites[1].dx = 1;
// 		this.sprites[1].dy = 0;

		for(var i=0;i<4;i++) {
			this.sprites.push(new Asteroid(this.ctx, 0+i*50,0+i*50));
		}
	}

	drawSprites() {
		this.sprites.forEach(sprite => sprite.draw());
	}

	startLoop() {
		requestAnimationFrame(this.gameLoop.bind(this));
// 		setInterval(() => this.gameLoop(), 1000/60);
	}

	gameLoop() {
		this.ctx.clearRect(0,0,this.ctx.width,this.ctx.height);
		if(true) {
			this.ctx.beginPath();
			this.ctx.moveTo(0,this.ctx.height/2);
			this.ctx.lineTo(this.ctx.width, this.ctx.height/2);
			this.ctx.moveTo(this.ctx.width/2, 0);
			this.ctx.lineTo(this.ctx.width/2, this.ctx.height);
			this.ctx.closePath();
			this.ctx.stroke();
		}
		this.drawSprites();
		this.sprites.forEach((sprite,i) => {
			sprite.update();
			if(i>0) {
				if(Sprite.isCollision(this.player, sprite)) {
					console.log('COLLISION');
				}
			}
		});


		requestAnimationFrame(this.gameLoop.bind(this));
	}

}

var game = new Game(500,500);		// window.innerWidth,window.innerHeight
