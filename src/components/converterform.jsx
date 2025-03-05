import { useState } from 'react';
import { CurrencySelect } from "./currencySelect"
export const Converterform = () => {
    const [total, settotal] = useState("Enter and click");
    const [fromcurrcode, setfromcurrcode] = useState("USD");
    const [tocurrcode, settocurrcode] = useState("INR");
    const [amount, setamount] = useState(1);
    const handleSwap = () => {
        setfromcurrcode(tocurrcode);
        settocurrcode(fromcurrcode);
        settotal("");
    }
    const getExchangeRate = async (fromcurrcode, tocurrcode) => {
        const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromcurrcode.toLowerCase()}.json`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            //data
            const exchangeRate = data[fromcurrcode][tocurrcode];
            console.log(`per mal ${fromcurrcode.toUpperCase()} ${exchangeRate} ${tocurrcode.toUpperCase()}! `);
            if (!exchangeRate) {
                throw new Error("Invalid currency code");
            }
            settotal(exchangeRate * amount);
            setamount("");
        }
        catch (err) {
            console.error("error fetching the api");
        }

    }
    const fromsubmit = (e) => {
        e.preventDefault();
        getExchangeRate(fromcurrcode.toLowerCase(), tocurrcode.toLowerCase());

    }
    return (
        <>
            <form className="converter-form" onSubmit={fromsubmit}>
                <div className="form-group">
                    <label className="form-label">Enter Amount</label>
                    <input type="number" placeholder='enter' className='form-input' required value={amount} onChange={e => setamount(e.target.value)} />
                </div>
                <div className="form-group from-currency-group">
                    <div className="form-section">
                        <label className="form-label">From</label>
                        <CurrencySelect seletedcurr={fromcurrcode}
                            handlecurr={e => setfromcurrcode(e.target.value)}
                        />
                    </div>
                    <div className="swap-icon">
                        <button type='button' style={{ backgroundColor: 'white' }} onClick={handleSwap}>swap</button>
                    </div>
                    <div className="form-section">
                        <label className="form-label">To</label>
                        <CurrencySelect seletedcurr={tocurrcode}
                            handlecurr={e => settocurrcode(e.target.value)}
                        />
                    </div>
                </div>
                <div className="result">
                    <button type='submit' className="submit-button">Get the value</button>
                    <p className="get-result">{fromcurrcode} to {tocurrcode}: {total}</p>
                </div>

            </form>

        </>
    )
}
