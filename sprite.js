'use strict';

class Sprite {
	constructor(x,y) {
		this.active = true;
		this.x = x;
		this.y = y;
		this.angle = 0;
		this.w = 32;
		this.h = 32;
		this.dx = 0;
		this.dy = 0;
		this.color = 'black';
	}

	beforeDraw() {
		ctx.save();
		ctx.translate(WIDTH/2 + this.x, HEIGHT/2 - this.y);
		ctx.rotate(this.angle);
	}
	afterDraw() {
		ctx.restore();
	}

	draw() {
		this.beforeDraw();
		ctx.strokeStyle = this.color;
		ctx.strokeRect(-this.w/2, -this.h/2, this.w,this.h);
		this.afterDraw();
	}

	update() {
		this.x += this.dx;
		this.y += this.dy;

// 		if(this.left<=-WIDTH/2 || this.right>=WIDTH/2) {
// 			this.dx *= -1;
// 		}
// 		if(this.bottom<=-HEIGHT/2 || this.top>=HEIGHT/2) {
// 			this.dy *= -1;
// 		}
	}

	get left()   {return this.x - this.w/2;}
	get right()  {return this.x + this.w/2;}
	get top()    {return this.y + this.h/2;}
	get bottom() {return this.y - this.h/2;}

	static isCollision(a,b) {
		return a.left   <= b.right
			&& a.right  >= b.left
			&& a.top    >= b.bottom
			&& a.bottom <= b.top;
	}
}
