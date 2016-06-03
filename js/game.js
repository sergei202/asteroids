'use strict';

class Game {
	constructor(w,h) {
		this.initCanvas(w,h);
		this.initInput();
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

	initInput() {
		this.keys = {};
		document.addEventListener('keyup',   this.onKeyEvent.bind(this));
		document.addEventListener('keydown', this.onKeyEvent.bind(this));
	}

	onKeyEvent(event) {
		var state = event.type==='keydown';
		this.keys[event.key] = state;
	}

	initSprites() {
		this.sprites = [];

		this.player = new Player(this.ctx, 0,100);
		this.sprites.push(this.player);

// 		for(var i=0;i<32;i++) {
// 			this.sprites.push(new Sprite(this.ctx, Math.sin(i/5)*100,  Math.cos(i/5)*100, 4,4));
// 		}

// 		this.sprites.push(new Sprite(this.ctx, -0,0, 32,32));
// 		this.sprites[1].dx = 0;
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

		this.player.handleKeys(this.keys);

		this.sprites.forEach((sprite,i) => {
			sprite.update();
			if(i>0) {
				if(Sprite.isCollision(this.player, sprite)) {
					console.log('COLLISION');
					sprite.dx *= -1;
					sprite.dy *= -1;
				}
			}
		});

		requestAnimationFrame(this.gameLoop.bind(this));
	}

}

var game = new Game(500,500);		// window.innerWidth,window.innerHeight
