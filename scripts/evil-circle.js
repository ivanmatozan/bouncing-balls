define(["ball"], function (Ball) {
    var EvilCircle = function EvilCircle(x, y, velX, velY, color, size) {
        Ball.call(this, x, y, velX, velY, color, size);
    };

    EvilCircle.prototype = Object.create(Ball.prototype);
    EvilCircle.prototype.constructor = EvilCircle;

    EvilCircle.prototype.draw = function(ctx) {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    };

    EvilCircle.prototype.checkBound = function(width, height) {
        if ((this.x + this.size) >= width) {
            this.x -= this.size;
        }

        if ((this.x - this.size) <= 0) {
            this.x += this.size;
        }

        if ((this.y + this.size) >= height) {
            this.y -= this.size;
        }

        if ((this.y - this.size) <= 0) {
            this.y += this.size
        }
    };

    EvilCircle.prototype.setControls = function() {
        var self = this;
        window.onkeydown = function(e) {
            if (e.keyCode === 37) {
                // Left
                self.x -= self.velX;
            } else if (e.keyCode === 39) {
                // Right
                self.x += self.velX;
            } else if (e.keyCode === 38) {
                // Down
                self.y -= self.velY;
            } else if (e.keyCode === 40) {
                // Up
                self.y += self.velY;
            }
        }
    };

    EvilCircle.prototype.collisionDetect = function(balls) {
        for (var j = 0; j < balls.length; j++) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                // Remove ball from array
                balls.splice(j, 1);
            }
        }
    };

    return EvilCircle;
});