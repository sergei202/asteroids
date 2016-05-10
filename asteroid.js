'use strict';

class Asteroid {
	constructor() {
		this.color = '#888';
		this.dx = 3*Math.random()-1;
		this.dy = 3*Math.random()-1;

		this.x = Math.sign(this.dx) * -300;
		this.y = Math.sign(this.dy) * -200;

		this.angle = 0;
		this.width = 16;
		this.height = 16;
		this.active = true;

		this.points = [];
		var angle=0, sides=4, x,y;
		for(var i=0;i<sides;i++) {
			angle += (0.8 + 0.5*(Math.random()-0.5)) * (Math.PI*2 / sides);
			x = this.width * Math.sin(angle);
			y = this.height * Math.cos(angle);
			this.points.push({x:x,y:y});
		}
	}

	update() {
		if(this.angle<0) this.angle=0;
		if(this.angle>Math.PI*2) this.angle=Math.PI*2;
		this.x += this.dx;
		this.y += this.dy;
		if(this.x<-game.width/2 || this.x>game.width/2 || this.y<-game.height/2 || this.y>game.height/2) this.active = false;
	}

	destroy() {
		if(this.hit) return;
		this.hit = true;
		this.decay = 30;
		this.width *= 2;
		this.height *=2;
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(game.width/2 + this.x, game.height/2 + this.y);
		ctx.rotate(this.angle);
		ctx.fillStyle = this.color;
		ctx.strokeStyle = 'gray';
		ctx.beginPath();
		if(this.hit) {
			ctx.arc(0,0, this.width/2, 0,2*Math.PI);
			ctx.fillStyle = ctx.strokeStyle = 'red';
			ctx.fill();
			this.dx = this.dy = 0;
			this.width *= 0.9;
			this.height *= 0.9;
			this.decay--;
			if(!this.decay) this.active = false;
		} else {
			ctx.moveTo(0,this.height);
			this.points.forEach(function(p) {
				ctx.lineTo(p.x, p.y);
			});
			ctx.lineTo(0,this.height);
		}
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	}
}
