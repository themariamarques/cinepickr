import React, { useContext } from 'react';
import { FilmsContext } from '../../context/Films';

const FilmsList = () => {
    const films = useContext(FilmsContext);

    return (
        <div>
            <h1>FILMS LIST</h1>
            {
                films.map((film, index) => {
                    return <h2 key={index}>{film}</h2>
                })
            }
        </div>
    );
}

export default FilmsList;