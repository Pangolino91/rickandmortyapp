import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { charsActions } from '../../store/chars-slice';



import classes from './CharacterModal.module.css'


const CharacterModal = (props) => {
  const dispatch = useDispatch();
  const favList = useSelector((state) => state.chars.favList);
  const readableDate = props.el.created.substring(0, 10);
  const dateCreationObj = new Date(readableDate);
  const dateCreation = `${dateCreationObj.getDay()}-${dateCreationObj.getMonth()}-${dateCreationObj.getFullYear()}`

  

  const closeModalHandler = (e) => {
    props.closeModal(e);
  }

  const addToFavHandler = (e) => {
    e.preventDefault();
    dispatch(charsActions.addToFav(props.el.id));
    
  }
  const removeFromFavHandler = (e) => {
    e.preventDefault();
    dispatch(charsActions.removeFromFav(props.el.id)); 
  }


  return (
    <Fragment>
      <div className={classes.backdrop}>
        <div className={classes.modalContainer}>
          <div className="Center-Content">
            <div className={classes.charCard} id={props.id}>
              <img src={props.el.image} /><br />
              <p><b>{props.el.name}</b></p>
              <p>Creation date: {dateCreation}</p>
              <p>Gender: {props.el.gender}</p>
              <p>Species: {props.el.species}</p>
              <p>Status: {props.el.status}</p>
              {!favList.includes(props.el.id) && <div onClick={addToFavHandler} className={`${classes['custom-btn']} ${classes['btn-6']}`}>ADD TO FAV</div>}
              {favList.includes(props.el.id) && <div onClick={removeFromFavHandler} className={`${classes['custom-btn']} ${classes['btn-7']}`}>REMOVE FAV</div>}
              <div onClick={closeModalHandler} className={`${classes['custom-btn']} ${classes['btn-5']}`}>CLOSE</div><br />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CharacterModal