import { useState,useEffect } from "react";
import { createLogger } from "vite";

function usecurrencyInfo(currency){
    [data,setData] = useState({})
    useEffect(()=>{
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then((res)=>res.json())
        .then((res)=>setdata(res[currency]))
        console.log(data);
    },[currency])
    console.log(data);
    
    return data;
}
export default usecurrencyInfo;