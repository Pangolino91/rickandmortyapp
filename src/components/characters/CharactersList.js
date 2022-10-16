import { Fragment, useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';
import { useDispatch, useSelector } from "react-redux";
import { fetchChars } from '../../store/chars-slice';
import classes from './CharactersList.module.css'
import Pagination from '../Pagination';
import { Link } from "react-router-dom";
import SearchInput from '../SearchInput';



const CharactersList = () => {
    const dispatch = useDispatch();
    const charsList = useSelector((state) => state.chars.charsList);
    const pages = useSelector((state) => state.chars.pagesInfo);
    const errMessage = useSelector((state) => state.chars.fetchError);

    useEffect(() => {
        dispatch(fetchChars());
    }, [dispatch])

    const charListJsx = charsList.map((el) => {
        console.log(el)
        return (
            <CharacterCard
                el={el}
                key={el.id}
            />)
    })

    let pageTotal = pages.pages;

    return (
        <Fragment>
            <h1>NEW characters list coming from 1.1.2</h1>
            <nav>
                <Link to="/favlist">Fav List</Link>
            </nav>
            <SearchInput />
            <div className={classes.mainrow}>
                {charsList && charListJsx}
            </div>
            <Pagination charList={charsList} pagesTotal={pageTotal} nextPage={pages.next} prevPage={pages.prev} />
            <h1>{errMessage}</h1>
        </Fragment>
    )
}

export default CharactersList