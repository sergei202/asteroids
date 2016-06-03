'use strict';

class Sprite {
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.w = 32;
		this.h = 32;
		this.dx = 0;
		this.dy = 0;
		this.color = 'black';
	}

	draw() {
		ctx.strokeStyle = this.color;
		ctx.strokeRect(WIDTH/2 + this.x - this.w/2,HEIGHT/2 - this.y - this.h/2, this.w,this.h);
	}
	update() {
		this.x += this.dx;
		this.y += this.dy;

		if(this.x<=-WIDTH/2 || this.x>=WIDTH/2-this.w) {
			this.dx *= -1;
		}
		if(this.y<=-HEIGHT/2 || this.y>=HEIGHT/2-this.h) {
			this.dy *= -1;
		}
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
