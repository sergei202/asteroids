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
}
