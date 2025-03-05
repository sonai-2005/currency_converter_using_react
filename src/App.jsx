import React from 'react'
import{Converterform } from './components/converterform'
export const App = () => {
    return (
        <div className='currency-converter' style={{textAlign:'center'}}>
            <h2 className='title'>Currency Converter</h2>
            <Converterform/>
        </div>
    )
}
