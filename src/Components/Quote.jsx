import React from 'react';
import styled from '@emotion/styled'

const ResultDiv = styled.div`
    color: #FFF;
    font-family: 'Bebas Neue', cursive;

    p {
        span {
            font-weight: bold;
        }
    }
`

const P = styled.p`
    font-size: 18px;
`

const PPrice = styled.p`
    font-size: 30px;
`

const Quote = ({result}) => {

    if (Object.keys(result).length === 0) return null

    console.log(result)

    return (
        <ResultDiv>
            <PPrice>The pricing is: <span>{result.PRICE}</span></PPrice>
            <P>Higher Price of the Day: <span>{result.HIGHDAY}</span></P>
            <P>Lowest Price of the Day: <span>{result.LOWDAY}</span></P>
            <P>Variation last 24 Hours: <span>{result.CHANGEPCT24HOUR}</span></P>
            <P>Last Update: <span>{result.LASTUPDATE}</span></P>
        </ResultDiv>
    );
};

export default Quote;