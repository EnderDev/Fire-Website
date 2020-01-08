import React, { useState } from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import Footer from "../components/footer";
import fetch from "isomorphic-unfetch";

const Commands = props => {
    const [currentCategory, changeCategory] = useState(0);

    return (
        <div>
            <Head title={"Commands"} />

            <Nav />

            <div id="content-section">
                <div className="container text-left">
                    <div className="row">
                        <div
                            className="col-md-3"
                            style={{ marginBottom: 15 + "px" }}
                        >
                            <h3>
                                <strong>Categories</strong>
                            </h3>

                            <div id="categories">
                                <ul
                                    id="categories-list"
                                    className="list-unstyled"
                                >
                                    {props.categories.map(e => (
                                        <li
                                            key={e.id}
                                            className={
                                                e.id === currentCategory
                                                    ? "c-active noselect"
                                                    : "noselect"
                                            }
                                            onClick={() => changeCategory(e.id)}
                                            disabled={e.id === currentCategory}
                                        >
                                            {e.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <h3>
                                <strong>Commands</strong>
                            </h3>
                            <div
                                className="table-responsive"
                                style={{ paddingBottom: "0px" }}
                            >
                                <table className="table table-striped">
                                    <thead className="table-head">
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Usage</th>
                                            <th>Aliases</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {Object.entries(
                                            props.categories[currentCategory]
                                                .commands
                                        )
                                            .map(([name, obj]) => [
                                                name,
                                                ...Object.values(obj)
                                            ])
                                            .map(commandFields => (
                                                <tr key={commandFields[0]}>
                                                    {commandFields.map(
                                                        field => (
                                                            <td
                                                                key={field}
                                                                className={
                                                                    commandFields[0] ==
                                                                    field
                                                                        ? "cmdName"
                                                                        : commandFields[1] ==
                                                                          field
                                                                        ? "cmdDesc"
                                                                        : commandFields[2] ==
                                                                          field
                                                                        ? "cmdUsage"
                                                                        : commandFields[3] ==
                                                                          field
                                                                        ? "cmdAliases"
                                                                        : ""
                                                                }
                                                            >
                                                                {" "}
                                                                {field}{" "}
                                                            </td>
                                                        )
                                                    )}
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

Commands.getInitialProps = async function() {
    const res = await fetch("https://api.gaminggeek.dev/commands");
    const data = await res.json();
    return {
        categories: data
    };
};

export default Commands;
