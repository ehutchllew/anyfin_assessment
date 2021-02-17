import React, { useState } from "react";
import { countryService } from "../services/countryService";
import { CountryCell } from "./CountryCell";

export const Landing = () => {
    const [countryValue, setCountryValue] = useState("");
    const [countries, setCountries] = useState([]);
    function onKeyPressInput(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            countryService({
                filter: { name: countryValue },
            }).then((countries) => setCountries(countries));
        }
    }

    function onChangeCountryValue(e: any) {
        setCountryValue(e.target.value);
    }

    return (
        <main className="bg-white max-w-2xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
            <section>
                <h3 className="font-bold text-2xl">Search A Country</h3>
            </section>

            <section className="mt-10">
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <input
                        onKeyPress={onKeyPressInput}
                        type="text"
                        id="search"
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-3 pb-3"
                        value={countryValue}
                        onChange={onChangeCountryValue}
                    />
                </div>
            </section>

            <section className="mt-10">
                {countries.map((country: any, i) => (
                    <div key={country.fullName}>
                        <CountryCell key={country.fullName} country={country} />
                        {i < countries.length - 1 && (
                            <div className="bg-gray-200 h-0.5" />
                        )}
                    </div>
                ))}
            </section>
        </main>
    );
};
