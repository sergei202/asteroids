'use strict';

class Player {
	constructor() {
		this.x = 250;
		this.y = 50;
		this.w = 32;
		this.h = 32;
		this.dx = 2;
		this.dy = 2;
	}

	draw() {
		ctx.strokeStyle = 'black';
		ctx.strokeRect(this.x,this.y, this.w,this.h);
	}
	update() {
		this.x += this.dx;
		this.y += this.dy;

		if(this.x<=0 || this.x>=WIDTH-this.w) {
			this.dx *= -1;
		}
		if(this.y<=0 || this.y>=HEIGHT-this.h) {
			this.dy *= -1;
		}
	}
}

