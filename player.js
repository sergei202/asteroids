'use strict';

class Player {
	constructor() {
		this.color = 'blue';
		this.x = 0;
		this.y = 0;
		this.angle = 0;
		this.width = 20;
		this.height = 32;
	}

	fire() {
		console.log('player.fire()');
		bullets.push(new Bullet(this.angle));
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(game.width/2 + this.x, game.height/2 - this.y);
		ctx.rotate(this.angle);
		ctx.fillStyle = this.color;
		ctx.strokeStyle = 'black';
		ctx.beginPath();
		ctx.moveTo(0,-this.height/2);
		ctx.lineTo(+this.width/2, this.height/2);
		ctx.lineTo(0,this.height/3);
		ctx.lineTo(-this.width/2, this.height/2);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	}
}
