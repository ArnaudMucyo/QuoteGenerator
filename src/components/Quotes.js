import React, {useEffect, useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './Quotes.css'
import AllQuotes from '../Quotes/quotes.txt'


const Quotes = () => {

    const [quotes,setQuotes] = useState('');
    const [quoteValue,setQuoteValue] = useState('');
    const [copied,setCopied] = useState(false);
    const [like,setLike] = useState(true);



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
        },2500);
    }


    useEffect(() => {
        getQuote()
    },[]);

    const iconHandler = () => {
        if (like){
            setLike(false);
        }
        else{
            setLike(true);
        }
    }





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
                    <button className="button_design" onClick={getQuote}  type="button">Next Quote</button>
                    <CopyToClipboard onCopy={copyTextHandler} text={quotes.text}>
                        <button className="button_design"
                                onClick={() => setQuoteValue(quotes.text.value)}
                                type="button">Copy Quote</button>
                    </CopyToClipboard>
                    <div className="heart-container">
                        <FontAwesomeIcon icon={faHeart} className="icon-heart" onClick={iconHandler} style={{color : like ? "#68A7AD" : "#E2D784",fontSize : like ? null: "30px"}}/>
                    </div>



                </div>





            </div>


        </div>
    )
}

export default Quotes;