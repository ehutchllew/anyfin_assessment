import React from "react";

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
                    return (
                        <div
                            className="flex justify-between"
                            key={currency.code}
                        >
                            <p className="text text-gray-500">
                                {currency.code}
                            </p>
                            <p className="text text-gray-500">
                                {currency.exchangeRate.toFixed(2)}{" "}
                                {currency.exchangeCode}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
