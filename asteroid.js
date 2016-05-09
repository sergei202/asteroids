'use strict';

class Asteroid {
	constructor() {
		this.color = 'red';
		this.dx = 3*Math.random()-1;
		this.dy = 3*Math.random()-1;

		this.x = Math.sign(this.dx) * -300;
		this.y = Math.sign(this.dy) * -200;

		this.angle = 0;
		this.width = 32;
		this.height = 32;
		this.active = true;
	}

	update() {
		if(this.angle<0) this.angle=0;
		if(this.angle>Math.PI*2) this.angle=Math.PI*2;
		this.x += this.dx;
		this.y += this.dy;
		if(this.x<-game.width/2 || this.x>game.width/2 || this.y<-game.height/2 || this.y>game.height/2) this.active = false;
	}

	destroy() {
		if(this.hit) return;
		this.hit = true;
		this.decay = 30;
		this.width *= 2;
		this.height *=2;
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(game.width/2 + this.x, game.height/2 + this.y);
		ctx.rotate(this.angle);
		ctx.fillStyle = this.color;
		ctx.strokeStyle = 'black';
		ctx.beginPath();
		ctx.arc(0,0, this.width/2, 0,2*Math.PI);
		if(this.hit) {
			ctx.fillStyle = ctx.strokeStyle = 'red';
			ctx.fill();
			this.dx = this.dy = 0;
			this.width *= 0.9;
			this.height *= 0.9;
			this.decay--;
			if(!this.decay) this.active = false;
		}
		ctx.stroke();
		ctx.restore();
	}
}
