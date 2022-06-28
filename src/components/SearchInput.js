import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { searchChar } from '../store/chars-slice';


const SearchInput = () => {
    const dispatch = useDispatch();

    const searchCharHandler = (e) => {
        dispatch(searchChar(e.target.value));
    }

    return (
        <Fragment>
            <label htmlFor="search-char"></label>
            <input onChange={searchCharHandler} type="text" id='search-char' placeholder='Type character'></input>
        </Fragment>
    )
}

export default SearchInput