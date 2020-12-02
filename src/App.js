import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import img from './crypto.png'
import Form from './Components/Form'
import Axios from 'axios'
import Quote from './Components/Quote'
import Spinner from './Components/Spinner'

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`

const Img = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`

function App() {

  const [coin, setCoin] = useState('');
  const [cryptoCoin, setCryptoCoin] = useState('');
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    
    if(coin === '') return

    const quoteCrypto = async () => {

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCoin}&tsyms=${coin}`
    
      const result = await Axios.get(url)

      setLoading(true)

      setTimeout(() => {

        setLoading(false)

        setResult(result.data.DISPLAY[cryptoCoin][coin])
      }, 3000)
  
      
    }
    quoteCrypto()
  }, [coin, cryptoCoin])

  const Component = (loading) ? <Spinner /> : <Quote result={result} />;

  return (
    <Container>
      <div>
        <Img 
          src={img}
          alt='bitcoin'
        />
      </div>
      <div>
        <Heading>Quote Cryptocurrencies</Heading>
        <Form 
          setCoin={setCoin}
          setCryptoCoin={setCryptoCoin}
        />
        {Component}
      </div>
    </Container>
  );
}

export default App;
