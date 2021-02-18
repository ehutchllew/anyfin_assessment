import React, { useState } from "react";

interface ICurrencyInputFieldProps {
    currency: {
        code: string;
        exchangeCode: string;
        exchangeRate: number;
        name: string;
        symbol: string;
    };
}
export const CurrencyInputField = ({ currency }: ICurrencyInputFieldProps) => {
    const [exchangeValue, setExchangeValue] = useState(1);
    const [sekValue, setSekValue] = useState(
        Number(currency.exchangeRate.toFixed(5))
    );

    function onChangeSekValue(e: any) {
        setExchangeValue(Number(e.target.value) / currency.exchangeRate);
        setSekValue(e.target.value);
    }
    return (
        <div className="flex justify-between" key={currency.code}>
            <p className="text text-gray-500">
                {Number(exchangeValue).toFixed(5)} {currency.code}
            </p>
            <p className="text text-gray-500">
                <input
                    className="bg-gray-100 rounded text-gray-700 focus:outline-none border-b-4 border-gray-200 focus:border-blue-600 transition duration-500 px-3 text-right"
                    value={sekValue}
                    onChange={onChangeSekValue}
                />{" "}
                {currency.exchangeCode}
            </p>
        </div>
    );
};
