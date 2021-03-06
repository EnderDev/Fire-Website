import React from "react";
const Nav = () => (
    <nav className="navbar navbar-dark navbar-expand-md" id="navbar">
        <div className="container">
            <a
                className="navbar-brand"
                href="/"
                style={{ fontSize: 14 + "pt" }}
            >
                <img id="logo-img" src={"/logo.svg"} />
            </a>
            <button
                data-toggle="collapse"
                className="navbar-toggler"
                data-target="#navcol-1"
            >
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" href="/commands">
                            Commands
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" href="/stats">
                            Stats
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" href="https://inv.wtf/geek">
                            Support
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" href="/about">
                            About
                        </a>
                    </li>
                    <li
                        className="nav-item"
                        role="presentation"
                        id="invite-btn"
                    >
                        <a
                            className="nav-link active"
                            href="https://dash.gaminggeek.space"
                        >
                            Dashboard
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Nav;
