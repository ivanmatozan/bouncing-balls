requirejs.config({
    baseUrl: "scripts",
    paths: {
        app: "../app"
    }
});

// Start loading main app file
requirejs(["main"]);