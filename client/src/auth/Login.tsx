import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginService } from "../services/loginService";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    function onSignInPressed(e: any) {
        loginService({ username, password })
            .then((resp) => {
                history.push("dashboard");
            })
            .catch((e) => console.warn(e));
    }

    function onChangeUsername(e: any) {
        setUsername(e.target.value);
    }

    function onChangePassword(e: any) {
        setPassword(e.target.value);
    }

    return (
        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
            <section>
                <h3 className="font-bold text-2xl">Välkommen</h3>
                <p className="text-gray-600 pt-2">Sign in to your account.</p>
            </section>

            <section className="mt-10">
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-3 pb-3"
                        onChange={onChangeUsername}
                        value={username}
                    />
                </div>
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-3 pb-3"
                        onChange={onChangePassword}
                        value={password}
                    />
                </div>
                <div className="flex justify-end">
                    <a
                        href="#"
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline mb-6"
                    >
                        Forgot your password?
                    </a>
                </div>

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                    onClick={onSignInPressed}
                >
                    Sign In
                </button>
            </section>
        </main>
    );
};
