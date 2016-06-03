'use strict';

class Asteroid extends Sprite {
	constructor(x,y) {
		super();
		this.x = x;
		this.y = y;
		this.color = 'red';

		this.dx = 2;
		this.dy = 2;
	}
	
	update() {
		this.x += this.dx;
		this.y += this.dy;

		if(this.left<=-WIDTH || this.right>=WIDTH) {
			this.active = false;
		}
		if(this.bottom<=-HEIGHT || this.top>=HEIGHT) {
			this.active = false;
		}
	}
}
