import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import useCurrency from '../hooks/useCurrency'
import useCrypto from '../hooks/useCrypto'
import Error from './Error'
import Axios from 'axios';

const Button = styled.button`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color:#66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`

const Form = ({setCoin, setCryptoCoin}) => {

    const [listCrypto, setListCrypto] = useState([])

    const [error, setError] = useState(false)

    const CURRENCIES = [{
        cod: 'USD', name: 'USA Dolar'
    },
    {
        cod: 'MXN', name: 'Mexican Peso'
    },
    {
        cod: 'EUR', name: 'Euro'
    },
    {
        cod: 'GBP', name: 'Pound'
    }]

    const [currency, SelectCurrencie] = useCurrency('Choice your currency', '', CURRENCIES)

    const [crypto, SelectCrypto] = useCrypto('Choose your CryptoCoin', '', listCrypto)

    useEffect(()=> {
        const API = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

            const result = Axios.get(url)

            setListCrypto((await result).data.Data)
        }

        API()
    }, [])

    const compareCoin = (e) => {
        e.preventDefault()

        if (crypto === '' || currency === '') {
            setError(true)
            return
        };

        setCoin(currency);

        setCryptoCoin(crypto)

        setError(false)
    }

    return (
        <div>
            <form
                onSubmit={compareCoin}
            >
                {error ? <Error message='All fields are required'/>: null}
                <SelectCurrencie />
                <SelectCrypto />
                <Button
                    type='submit'
                    value='calculate'
                >
                    Calculate
                </Button>
            </form>
        </div>
    );
};

export default Form;