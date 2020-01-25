import React from "react";
import Head from "../../../../components/head";
import Nav from "../../../../components/nav";
import { useRouter } from "next/router";
import cookies from "next-cookies";
import fetch from "isomorphic-unfetch";

const Settings = props => {
    const router = useRouter();
    const { gid } = router.query;
    return (
        <div>
            <Head title={props.guild.name} />
            <Nav />

            <div id="content-section">
                <div className="container">
                    <div className={"d-flex justify-content-center"}>
                        <h1>Coming Soon</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

Settings.getInitialProps = async function(ctx) {
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

export default Settings;
