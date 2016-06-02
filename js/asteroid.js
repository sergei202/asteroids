'use strict';

class Asteroid extends Sprite {
	constructor(ctx, x,y) {
		super(ctx, x,y, 32,32);
		this.color = 'red';
		this.dx = Math.random()*4 - 2;
		this.dy = Math.random()*4 - 2;
	}
}
