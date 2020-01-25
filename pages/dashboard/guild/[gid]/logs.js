import React from "react";
import Head from "../../../../components/head";
import Nav from "../../../../components/nav";
import { useRouter } from "next/router";
import cookies from "next-cookies";
import fetch from "isomorphic-unfetch";

const Logs = props => {
    const router = useRouter();
    const { gid } = router.query;
    return (
        <div>
            <Head title={props.guild.name} />
            <Nav />

            <div id="content-section">
                <div className="container">
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
                            <div className="row">
                                <h3>
                                    <strong>Warns</strong>
                                </h3>

                                <table className="table" id={"members"}>
                                    <thead className="table-head">
                                        <tr>
                                            <th>Case ID</th>
                                            <th>User</th>
                                            <th>Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {props.guild.warns.map((logCase, i) => (
                                            <tr key={logCase.caseid}>
                                                <td className={"name"}>
                                                    {logCase.caseid}
                                                </td>
                                                <td>
                                                    <img
                                                        className={"user-icon"}
                                                        src={logCase.avatar}
                                                    />
                                                    {logCase.name}
                                                </td>
                                                <td className={"tbl-grey-text"}>
                                                    {logCase.reason}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <br />
                            <div className="row">
                                <h3>
                                    <strong>Mutes</strong>
                                </h3>

                                <table className="table" id={"members"}>
                                    <thead className="table-head">
                                        <tr>
                                            <th>Case ID</th>
                                            <th>User</th>
                                            <th>Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {props.guild.mutes.map((logCase, i) => (
                                            <tr key={logCase.caseid}>
                                                <td className={"name"}>
                                                    {logCase.caseid}
                                                </td>

                                                <td>
                                                    <img
                                                        className={"user-icon"}
                                                        src={logCase.avatar}
                                                    />
                                                    {logCase.name}
                                                </td>
                                                <td className={"tbl-grey-text"}>
                                                    {logCase.reason}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <br />
                            <div className="row">
                                <h3>
                                    <strong>Bans</strong>
                                </h3>

                                <table className="table" id={"members"}>
                                    <thead className="table-head">
                                        <tr>
                                            <th>Case ID</th>
                                            <th>User</th>
                                            <th>Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {props.guild.bans.map((logCase, i) => (
                                            <tr key={logCase.caseid}>
                                                <td className={"name"}>
                                                    {logCase.caseid}
                                                </td>

                                                <td>
                                                    <img
                                                        className={"user-icon"}
                                                        src={logCase.avatar}
                                                    />
                                                    {logCase.name}
                                                </td>
                                                <td className={"tbl-grey-text"}>
                                                    {logCase.reason}
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
        </div>
    );
};

Logs.getInitialProps = async function(ctx) {
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

export default Logs;
