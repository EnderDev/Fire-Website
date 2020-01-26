const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const fetch = require("isomorphic-unfetch");
const cookieParser = require("cookie-parser");

const server = express();
server.use(cookieParser());

if (dev) {
    redirect_uri = "http://localhost:3000";
} else {
    redirect_uri = "https://fire.gaminggeek.space";
}

app.prepare().then(() => {
    server.get("/login", (req, res) => {
        if (req.cookies.access_token) res.redirect("/dashboard");
        res.redirect(
            `https://discordapp.com/oauth2/authorize?client_id=444871677176709141&redirect_uri=${redirect_uri}/dashboard/login&response_type=code&scope=identify%20email%20guilds%20guilds.join`
        );
    });

    server.get("/dashboard/login", async (req, res) => {
        if (!req.query.code) res.redirect("/login");
        cookie = req.cookies;
        for (var prop in cookie) {
            if (!cookie.hasOwnProperty(prop)) {
                continue;
            }
            try {
                res.cookie(prop, "", { expires: new Date(0) });
            } catch {
                continue;
            }
        }

        res.cookie("code", req.query.code);
        const tokenFetch = await fetch(
            `https://api.gaminggeek.dev/oauth/accesstoken/${req.query.code}`
        );
        const token = await tokenFetch.json();

        const userFetch = await fetch(
            `https://api.gaminggeek.dev/oauth/@me/${token.access_token}`
        );
        const userData = await userFetch.json();
        res.cookie("access_token", token.access_token);
        res.cookie("user_id", userData.user.id);

        res.redirect("/dashboard");
    });

    server.get("/dashboard", isAuthenticated, (req, res) => {
        return app.render(req, res, "/dashboard", req.query);
    });

    server.get("/dashboard/guild", isAuthenticated, (req, res) => {
        res.redirect("/dashboard");
    });

    server.get("/dashboard/guild/:gid", isAuthenticated, (req, res) => {
        return app.render(
            req,
            res,
            "/dashboard/guild/" + req.params.gid,
            req.query
        );
    });

    server.get("/about", (req, res) => {
        return app.render(req, res, "/about", req.query);
    });

    server.get("/commands", (req, res) => {
        return app.render(req, res, "/commands", req.query);
    });

    server.get("/stats", (req, res) => {
        return app.render(req, res, "/stats", req.query);
    });

    server.get("/logout", function(req, res) {
        cookie = req.cookies;
        for (var prop in cookie) {
            if (!cookie.hasOwnProperty(prop)) {
                continue;
            }
            res.cookie(prop, "", { expires: new Date(0) });
        }
        res.redirect("/");
    });

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});

function isAuthenticated(req, res, next) {
    if (req.cookies.access_token && req.cookies.access_token !== undefined)
        return next();
    res.redirect("/login");
}
