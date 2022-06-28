import React, { Fragment, useState } from 'react'
import useSelector from '@reduxjs/toolkit';
import CharacterModal from './CharacterModal'


import classes from './CharacterCard.module.css'

const CharacterCard = (props) => {
  const [modalAppear, setModalAppear] = useState(false);

  const charModalHandler = (e) => {
    e.preventDefault();
    setModalAppear(!modalAppear);
  }


  const modalAppearJsx =
      <CharacterModal 
      { ...props}
      closeModal={charModalHandler}
      />

  return (
    <Fragment>
      <div className={classes.charCard}>
        <a onClick={charModalHandler}><img src={props.el.image} /><br /></a>
        <p>{props.el.name}</p>
      </div>
      {modalAppear && modalAppearJsx}
    </Fragment>
  )
}

export default CharacterCard