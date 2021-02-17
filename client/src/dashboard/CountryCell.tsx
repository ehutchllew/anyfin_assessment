import React, { useState } from "react";

interface ICountryCellProps {
    country: {
        fullName: string;
        currencies: Array<{
            code: string;
            exchangeCode: string;
            exchangeRate: number;
            name: string;
            symbol: string;
        }>;
        population: string;
    };
}

export const CountryCell = ({ country }: ICountryCellProps) => {
    const [sekValue, setSekValue] = useState(0);
    const [exchangeValue, setExchangeValue] = useState(1);
    function onChangeSekValue(xrate: any, e: any) {
        setSekValue(e.target.value);
        setExchangeValue(Number(e.target.value) / xrate);
    }
    return (
        <div className="mb-6 p-3 rounded" key={country.fullName}>
            <h3 className="font-bold text">{country.fullName}</h3>
            <div className="flex flex-col my-2">
                <p className="font-bold text text-gray-600">Population</p>
                <p className="text text-gray-500">{country.population}</p>
            </div>
            <div className="flex flex-col my-2">
                <p className="font-bold text text-gray-600">Currencies</p>
                <div className="flex justify-between">
                    <p className="text text-gray-500 font-semibold">From</p>
                    <p className="text text-gray-500 font-semibold">To</p>
                </div>
                {country.currencies.map((currency) => {
                    if (sekValue == 0) {
                        setSekValue(Number(currency.exchangeRate.toFixed(3)));
                    }
                    return (
                        <div
                            className="flex justify-between"
                            key={currency.code}
                        >
                            <p className="text text-gray-500">
                                {Number(exchangeValue).toFixed(3)}{" "}
                                {currency.code}
                            </p>
                            <p className="text text-gray-500">
                                <input
                                    className="bg-gray-100 rounded text-gray-700 focus:outline-none border-b-4 border-gray-200 focus:border-blue-600 transition duration-500 px-3 text-right"
                                    value={sekValue}
                                    onChange={onChangeSekValue.bind(
                                        null,
                                        currency.exchangeRate
                                    )}
                                />{" "}
                                {currency.exchangeCode}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
