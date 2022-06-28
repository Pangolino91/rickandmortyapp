import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePage, prevPage, nextPage } from '../store/chars-slice';

import classes from './Pagination.module.css';

const Pagination = (props) => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.chars.currentPage)

    const changePageHandler = (e) => {
        e.preventDefault();
        dispatch(changePage(e.target.text));
    }

    const prevPageHandler = (e) => {
        e.preventDefault()
        dispatch(prevPage(props.prevPage));
    }
    const nextPageHandler = (e) => {
        e.preventDefault()
        dispatch(nextPage(props.nextPage));
    }


    let pagesArr = [];
    for (let index = 1; index < props.pagesTotal+1; index++) {
        pagesArr.push(<a className={`${classes['page-link']} ${currentPage == index ? classes.active : classes['not-active']}`} key={index} onClick={changePageHandler} href={`https://rickandmortyapi.com/api/character?page=${props.pageIndex}`}>
            {index}
        </a>)
    }

    return (
        <Fragment>
            {props.prevPage && <a href={props.prevPage} onClick={prevPageHandler}>Prev</a>}
            <h3>{props.charList && pagesArr}</h3>
            {props.nextPage && <a href={props.nextPage} onClick={nextPageHandler}>Next</a>}
        </Fragment>
    )
}

export default Pagination