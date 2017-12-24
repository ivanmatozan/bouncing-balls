define(function () {
    // Generate and return random number
    return function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
});