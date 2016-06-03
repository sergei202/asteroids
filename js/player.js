'use strict';

class Player extends Sprite {
	constructor(ctx, x,y) {
		super(ctx, x,y, 32,32);
		this.color = 'blue';
	}

	handleKeys(keys) {
		if(keys.ArrowRight)	this.x++;
		if(keys.ArrowLeft)	this.x--;
		if(keys.ArrowUp)	this.y++;
		if(keys.ArrowDown)	this.y--;
	}
}
