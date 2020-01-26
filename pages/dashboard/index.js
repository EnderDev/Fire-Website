import React from "react";
import Head from "../../components/head";
import Nav from "../../components/nav";
import fetch from "isomorphic-unfetch";
import cookies from "next-cookies";

const Dashboard = props => {
    return (
        <div>
            <Head title={"Dashboard"} />
            <Nav />

            <div id="content-section">
                <div className="container text-center">
                    <div className={"row d-flex justify-content-center "}>
                        {props.guilds.map(guild => (
                            <div
                                className={"col-md-2 card"}
                                key={guild.id}
                                style={{ margin: 15 + "px" }}
                            >
                                <img
                                    className="card-img-top"
                                    src={
                                        guild.icon !== null
                                            ? guild.icon
                                            : "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png"
                                    }
                                />
                                <div className="card-body">
                                    <span className="card-title">
                                        {guild.name}
                                    </span>
                                    <p className="card-text"></p>
                                    <div className={"db-buttons"}>
                                        <a
                                            href={
                                                guild.fire === "yes"
                                                    ? `/dashboard/guild/${guild.id}`
                                                    : `https://inv.wtf/fire?guild=${guild.id}`
                                            }
                                        >
                                            {guild.fire === "yes"
                                                ? "Manage"
                                                : "Invite fire"}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

Dashboard.getInitialProps = async function(ctx) {
    const { access_token } = cookies(ctx);
    const result = await fetch(
        `https://api.gaminggeek.dev/oauth/@me/${access_token}`
    );
    const data = await result.json();
    return {
        guilds: data.guilds,
        user: data.user
    };
};
export default Dashboard;
