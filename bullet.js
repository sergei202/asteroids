'use strict';

class Bullet {
	constructor(angle) {
		this.color = 'red';
		this.x = this.y = 0;
		this.radius = 2;
		this.width = this.height = this.radius*2;		// For collision detection

		var speed = 3;
		this.dx = Math.sin(angle) * speed;
		this.dy = -Math.cos(angle) * speed;
		this.active = true;
	}

	update() {
		this.x += this.dx;
		this.y += this.dy;
		if(this.x<-game.width/2 || this.x>game.width/2 || this.y<-game.height/2 || this.y>game.height/2) this.active = false;
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(game.width/2 + this.x, game.height/2 + this.y);
		ctx.rotate(this.angle);
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.arc(0,0, this.radius, 0,2*Math.PI);
		ctx.stroke();
// 		ctx.fill();
		ctx.restore();
	}

	get top()    {return this.y - this.height/2;}
	get bottom() {return this.y + this.height/2;}
	get left()   {return this.x - this.height/2;}
	get right()  {return this.x + this.height/2;}
}
