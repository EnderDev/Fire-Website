import React from "react";
import Head from "../../../../components/head";
import Nav from "../../../../components/nav";
import { useRouter } from "next/router";
import cookies from "next-cookies";
import fetch from "isomorphic-unfetch";

const Members = props => {
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
                            <h3>
                                <strong>Members</strong>
                            </h3>

                            <table className="table" id={"members"}>
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

Members.getInitialProps = async function(ctx) {
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

export default Members;
