import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from 'react-router-dom'

const FullPizza = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [pizza, setPizza] = useState()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://63c6ed58d307b7696743f513.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                alert('Такой пиццы нету :(')
                navigate('/')
            }
        }
        fetchPizza()
    }, [])

    if (!pizza) {
        return (<p className={'container'}>Loading...</p>)
    }

    return (
        <div className={'container'}>
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₴</h4>
        </div>
    )
}

export default FullPizza