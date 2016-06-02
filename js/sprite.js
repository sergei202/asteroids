'use strict';

class Sprite {
	constructor(ctx, x,y, w,h) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.dx = 0;
		this.dy = 0;
	}

	draw() {
		this.ctx.save();
		this.ctx.translate(this.ctx.width/2, this.ctx.height/2);
		this.ctx.strokeStyle = this.color;
		this.ctx.strokeRect(this.left,this.top, this.w,this.h);
		this.ctx.restore();
	}

	get left()   {return this.x-this.w/2;}
	get right()  {return this.x+this.w/2;}
	get top()    {return this.y-this.h/2;}
	get bottom() {return this.y+this.h/2;}

	update() {
		if(this.offCanvas()) {
			if(this.left < -this.ctx.width/2  || this.right  > this.ctx.width/2)  this.dx *= -1;
			if(this.top  < -this.ctx.height/2 || this.bottom > this.ctx.height/2) this.dy *= -1;
		}
		this.x += this.dx;
		this.y += this.dy;
	}

	offCanvas() {
		return this.left   < -this.ctx.width/2
			|| this.right  >  this.ctx.width/2
			|| this.top    < -this.ctx.height/2
			|| this.bottom >  this.ctx.height/2;
	}

	static isCollision(a,b) {
		return a.right >= b.left
			&& a.left <= b.right
			&& a.top <= b.bottom
			&& a.bottom >= b.top;
	}
}
