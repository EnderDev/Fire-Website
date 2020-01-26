import React from "react";
import Head from "../../../../components/head";
import Nav from "../../../../components/nav";
import { useRouter } from "next/router";
import cookies from "next-cookies";
import fetch from "isomorphic-unfetch";

const Guild = props => {
    const router = useRouter();
    const { gid } = router.query;
    return (
        <div>
            <Head title={props.guild.name} />
            <Nav />

            <div id="content-section">
                <div className="container">
                    <div className={"row"}>
                        <div className={"col-md-12 about-text"}>
                            <div
                                className={"row d-flex justify-content-center "}
                            >
                                <div className={"col-md"}>
                                    <strong>Members:</strong>
                                    <br />
                                    <span>{props.guild.total}</span>
                                </div>
                                <div className={"col-md"}>
                                    <strong>Humans:</strong>
                                    <br />
                                    <span>{props.guild.humans}</span>
                                </div>
                                <div className={"col-md"}>
                                    <strong>Bots:</strong>
                                    <br />
                                    <span>{props.guild.bots}</span>
                                </div>
                                <div className={"col-md"}>
                                    <strong>Roles:</strong>
                                    <br />
                                    <span>{props.guild.rolecount}</span>
                                </div>
                                <div className={"col-md"}>
                                    <strong>Channels:</strong>
                                    <br />
                                    <span>{props.guild.channelcount}</span>
                                </div>
                            </div>
                            <br />
                            <div
                                className={"row d-flex justify-content-center "}
                            >
                                <div className={"col-md"}>
                                    <strong>
                                        Server Boost Tier:{" "}
                                        {props.guild.boosttier}
                                    </strong>
                                    <br />
                                    <div className={"progress"}>
                                        <div
                                            className={"progress-bar"}
                                            role="progressbar"
                                            aria-valuemin="0"
                                            aria-valuemax={
                                                props.guild.boostneeded
                                            }
                                            style={{
                                                width: props.guild.boostpercent
                                            }}
                                        ></div>
                                    </div>
                                    <span style={{ color: "#aaa" }}>
                                        {props.guild.boostneeded} boosts needed
                                        for next tier
                                    </span>
                                </div>
                                <div className={"col-md"}>
                                    <strong>Humans/Bots:</strong>
                                    <br />
                                    <div className={"progress"}>
                                        <div
                                            className={"progress-bar"}
                                            role="progressbar"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{
                                                width:
                                                    props.guild.percenthumans +
                                                    "%"
                                            }}
                                        ></div>
                                    </div>
                                    <span style={{ color: "#aaa" }}>
                                        {props.guild.humans} humans and{" "}
                                        {props.guild.bots} bots
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className={"row"}>
                        <div className={"col-md-3 "}>
                            <div className={"card"}>
                                <img
                                    className="card-img-top"
                                    src={props.guild.icon}
                                />
                                <div className="card-body">
                                    <h2 className="card-title fire">
                                        {props.guild.name}
                                    </h2>
                                    <p className="card-text">
                                        <span>Owner:</span> {props.guild.owner}
                                        <br />
                                        <span>Created:</span>{" "}
                                        {props.guild.created}
                                        <br />
                                        <span>Verfication Level:</span>{" "}
                                        {props.guild.verificationlvl}
                                        <br />
                                        <span>Notification Mode:</span>{" "}
                                        {props.guild.notificationlevel}
                                    </p>
                                </div>

                                <ul className={"custom-buttons"}>
                                    <a
                                        href={`/dashboard/guild/${props.guild.id}`}
                                    >
                                        <li className={"custom-button"}>
                                            Overview
                                        </li>
                                    </a>
                                    <a
                                        href={`/dashboard/guild/${props.guild.id}/settings`}
                                    >
                                        <li className={"custom-button"}>
                                            Settings
                                        </li>
                                    </a>
                                    <a
                                        href={`/dashboard/guild/${props.guild.id}/members`}
                                    >
                                        <li className={"custom-button"}>
                                            Members
                                        </li>
                                    </a>
                                    <a
                                        href={`/dashboard/guild/${props.guild.id}/logs`}
                                    >
                                        <li className={"custom-button"}>
                                            Logs
                                        </li>
                                    </a>
                                </ul>
                            </div>
                        </div>
                        <div className={"col-md-9"}>
                            <h3>
                                <strong>Recent Members</strong>
                            </h3>

                            <table className="table">
                                <thead className="table-head">
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Joined</th>
                                        <th>Created</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {props.guild.lastmembers.map(member => (
                                        <tr key={member.id}>
                                            <td className={"name"}>
                                                {member.id}
                                            </td>
                                            <td>
                                                <img
                                                    className={"user-icon"}
                                                    src={member.avi}
                                                />
                                                {member.fullname}
                                            </td>
                                            <td className={"tbl-grey-text"}>
                                                {member.joined}
                                            </td>
                                            <td className={"tbl-grey-text"}>
                                                {member.created}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Guild.getInitialProps = async function(ctx) {
    const { access_token, code, user_id } = cookies(ctx);

    const auth = await fetch(
        `https://api.gaminggeek.dev/oauth/dashtoken/${user_id}/${ctx.query.gid}`,
        {
            headers: {
                token: access_token,
                code: code,
                Referer: `https://api.gaminggeek.dev/oauth/accesstoken/${code}`
            }
        }
    );

    const guildFetch = await fetch("https://api.gaminggeek.dev/dashapi/home", {
        headers: {
            token: access_token,
            code: code,
            Referer: `https://api.gaminggeek.dev/oauth/accesstoken/${code}`
        }
    });

    const guildData = await guildFetch.json();

    return {
        guild: guildData
    };
};

export default Guild;
