import React, { useEffect, Fragment, useState } from 'react'
import CharacterCard from './CharacterCard';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { renderFav } from '../../store/chars-slice';

const FavList = () => {
    const dispatch = useDispatch();
    const favList = useSelector(state => state.chars.favChars);

    useEffect(() => {
        dispatch(renderFav());
    }, [dispatch])



    let favListJsx;
    if (favList.length >= 1) {
        favListJsx = favList.map((el) => {

            return (
                <CharacterCard
                    el={el}
                    key={el.id}
                />)
        })
    }
    else if ('name' in favList) {
        favListJsx =
            <CharacterCard
                el={favList}
                key={favList.id}
            />
    }
    else {
        favListJsx = <p>No favourite! Please add at least one!!</p>
    }



    return (
        <Fragment>
            <nav>
                <Link to="/">Back to homepage</Link>
            </nav>
            <div>FavList Here!</div>

            {favListJsx}
        </Fragment>
    )
}

export default FavList