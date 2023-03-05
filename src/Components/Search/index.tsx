import React, {ChangeEvent, ChangeEventHandler} from "react";
import styles from './Search.module.scss'
import debounce from 'lodash.debounce';
import {setSearchValue} from "../../redux/filter/slice";
import {useCallback, useRef, useState} from "react";

import {useDispatch} from "react-redux";



const Search: React.FC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current?.focus() // ?
    }

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 400),
        [],
    )

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.wrapper}>
        <input
            ref={inputRef}
            value={value}
            onChange={onChangeInput}
            className={styles.root}
            type="text" placeholder={'Поиск пиццы...'}
        />
            {value ? (<svg
                onClick={onClickClear}
                className={styles.clear}
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729"/>
            </svg>) : ''}
        </div>
    )
}

export default Search