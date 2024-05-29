import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';

import './randomChar.scss';
import { unavailableImg, mjolnirImg } from '../../resources/imgFiles';
import { API_KEY } from '../../constants/constants';


export default class RandomChar extends Component {
  constructor(props){
    super(props); 
    this.updateChar();
  }

  state = {
    char: {},
    loading: true,
    error: false,
  }

  marvelService = new MarvelService(API_KEY);

  onCharLoaded = (char) => {
    this.setState({char, loading: false})
  }

  onError = () => {
    this.setState({loading: false, error: true})
  }

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  render (){
    const {char, loading, error} = this.state;
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;

    return (<>
      <div className="randomchar">
        {errorMessage}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!<br/>
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
            Or choose another one
          </p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnirImg} alt="mjolnir" className="randomchar__decoration"/>
        </div>
      </div>
    </>)
  }
}

const View = ({char}) => {
  const {name, description, thumbnail, homepage, wiki} = char;
  let srcImage = thumbnail ? thumbnail : unavailableImg;
  let descriptionText = description ? (description?.length > 250 ? description.slice(0, 250) + "..." : description) : "[DATA EXPUNGED]";

  return (
    <div className="randomchar__block">
      <img src={srcImage} alt="Random character" className="randomchar__img"/>
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {descriptionText}  
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
}