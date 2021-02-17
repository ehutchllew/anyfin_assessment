import React from "react";

export const CountryCell = () => {
    return (
        <div className="mb-6 p-3 rounded">
            <h3 className="font-bold text">Venezuela</h3>
            <div className="flex flex-col my-2">
                <p className="font-bold text text-gray-600">Population</p>
                <p className="text text-gray-500">100000</p>
            </div>
            <div className="flex flex-col my-2">
                <p className="font-bold text text-gray-600">Currencies</p>
                <div className="flex justify-between">
                    <p className="text text-gray-500 font-semibold">From</p>
                    <p className="text text-gray-500 font-semibold">To</p>
                </div>
                <div className="flex justify-between">
                    <p className="text text-gray-500">USD</p>
                    <p className="text text-gray-500">8 SEK</p>
                </div>
                <div className="flex justify-between">
                    <p className="text text-gray-500">EUR</p>
                    <p className="text text-gray-500">10 SEK</p>
                </div>
            </div>
        </div>
    );
};
