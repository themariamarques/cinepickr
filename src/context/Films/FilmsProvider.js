import FilmsContext from './FilmsContext';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import fetchFilmsInPortugal from '../../utils/fetchFilmsInPortugal'

const FilmsProvider = ({ children }) => {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetchFilmsInPortugal().then((data) => {
            setFilms(data);
        });
    })

    return (
        <FilmsContext.Provider
            value={ films }
        >
            {children}
        </FilmsContext.Provider>
    );
}

FilmsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default FilmsProvider;
