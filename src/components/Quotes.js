import React, {useEffect, useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";


import './Quotes.css'
import AllQuotes from '../Quotes/quotes.txt'

const Quotes = () => {

    const [quotes,setQuotes] = useState('');
    const [quoteValue,setQuoteValue] = useState('');
    const [copied,setCopied] = useState(false);



    const getQuote = () => {
        fetch(AllQuotes)
            .then((res) => res.json())
            .then((data) => {
                let randomNum = Math.floor(Math.random() * data.length);
                setQuotes(data[randomNum]);
            });





    }

    const copyTextHandler = () => {
        setCopied(true);
        setTimeout(function () {
            setCopied(false);
        },2000);
    }


    useEffect(() => {
        getQuote()
    },[]);





    return(
        <div>
            <div className="quote_card">
                <h2>QUOTE GENERATOR</h2>
                {copied ? <h4 style={{display: "block"}}>Copied!</h4> : null}
                <div className="quote_container">
                    <p>{quotes.text}</p>
                </div>
                {/*<h1>Author : {quotes.author!==null ? quotes.author:'Unknown'}</h1>*/}
                {quotes.author !== null ? <h1>Author : {quotes.author}</h1> : <h1>Author : Unknown</h1>}


                <div className="button_space">
                    <button className="button_design" onClick={getQuote}  type="button">Get Quote</button>
                    <CopyToClipboard onCopy={copyTextHandler} text={quotes.text}>
                        <button className="button_design"
                                onClick={() => setQuoteValue(quotes.text.value)}
                                type="button">Copy Quote</button>
                    </CopyToClipboard>

                </div>

            </div>


        </div>
    )
}

export default Quotes;