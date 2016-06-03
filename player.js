'use strict';

class Player extends Sprite {
	constructor(x,y) {
		super();
		this.x = x;
		this.y = y;
		this.color = 'blue';
		this.bullets = [];
	}

	draw() {
		this.beforeDraw();
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(0, -this.h/2);
		ctx.lineTo( this.w/3, this.h/2);
		ctx.lineTo(-this.w/3, this.h/2);
		ctx.closePath();
		ctx.stroke();
		this.afterDraw();
	}

	move(amount) {
		this.x += Math.sin(this.angle) * amount;
		this.y += Math.cos(this.angle) * amount;
	}

	fire() {
		var bullet = new Bullet(this.x, this.y);
		bullet.angle = player.angle;
		bullet.dx = Math.sin(bullet.angle) * 3;
		bullet.dy = Math.cos(bullet.angle) * 3;
		this.bullets.push(bullet);
	}
}
