define(["ball", "evil-circle", "random-number"], function (Ball, EvilCircle, random) {
    // define variables
    var numOfBalls = 20;
    var balls = [];

    // setup canvas
    var canvas = document.querySelector('canvas');
    var para = document.querySelector('p');
    var ctx = canvas.getContext('2d');

    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    // create evil circle
    var evilCircle = new EvilCircle(random(0, width),
        random(0, height),
        20,
        20,
        "white",
        15
    );

    evilCircle.setControls();

    function loop() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(0, 0, width, height);

        // Create Balls
        while (balls.length < numOfBalls) {
            var ball = new Ball(
                random(0, width),
                random(0, height),
                random(-7, 7),
                random(-7, 7),
                'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
                random(10, 20)
            );

            balls.push(ball);
        }

        for (var i = 0; i < balls.length; i++) {
            balls[i].draw(ctx);
            balls[i].update(width, height);
            balls[i].collisionDetect(balls);
        }

        evilCircle.draw(ctx);
        evilCircle.checkBound(width, height);
        evilCircle.collisionDetect(balls);

        para.textContent = numOfBalls = balls.length;

        // Recursive function
        requestAnimationFrame(loop);
    }

    // Start program
    loop();
});