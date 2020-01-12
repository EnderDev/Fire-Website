const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.get("/commands", (req, res) => {
        return app.render(req, res, "/commands", req.query);
    });

    server.get("/stats", (req, res) => {
        return app.render(req, res, "/stats", req.query);
    });

    server.get("/about", (req, res) => {
        return app.render(req, res, "/about", req.query);
    });

    server.get("/dashboard/", checkAuth, function(req, res) {
        return app.render(req, res, "/dashboard", req.query, req.user);
    });

    server.get("/dashboard/guild/:id", (req, res) => {
        return app.render(req, res, "/dashboard/guild/", { id: req.params.id });
    });

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send("not logged in :(");
}
