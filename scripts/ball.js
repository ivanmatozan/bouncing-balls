define(["shape", "random-number"], function (Shape, random) {
    var Ball = function Ball(x, y, velX, velY, color, size) {
        Shape.call(this, x, y, velX, velY);
        this.color = color;
        this.size = size;
    };

    Ball.prototype = Object.create(Shape.prototype);
    Ball.prototype.constructor = Ball;

    Ball.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    };

    Ball.prototype.update = function (width, height) {
        // Bounce left
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        // Bounce right
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        // Bounce down
        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        // Bounce up
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    };

    Ball.prototype.collisionDetect = function (balls) {
        for (var j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                var dx = this.x - balls[j].x;
                var dy = this.y - balls[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                }
            }
        }
    };

    return Ball;
});
