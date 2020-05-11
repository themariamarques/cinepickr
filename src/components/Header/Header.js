import React, { useState, useEffect } from "react";
import { getRandomNumberInInterval } from "../../utils/getRandomNumberInInterval";
import fetchTmdbCover from "../../services/fetchTmdbCover";
import backdropFilmsList from "../../constants/backdropFilmsList.json";
import styled from "@emotion/styled";

const Header = () => {
  const [bgImg, setBgImg] = useState("");

  useEffect(async () => {
    const randomNumber = Math.floor(Math.random() * 10);

    const basePath = "https://image.tmdb.org/t/p/w1280/";
    const filmDetails = await fetchTmdbCover(
      backdropFilmsList[getRandomNumberInInterval(0, 30)]
    );

    setBgImg(`${basePath}${filmDetails.backdrop_path}`);
    return () => {};
  }, []);

  const Header = styled.header`
    display: flex;
    justify-content: center;
    flex-flow: column;
    padding: 2.4rem;
    height: 20rem;
    @media (min-width: 80rem) {
      height: 50rem;
    }
    background-position: top;
    background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.8) 20%,
        #14151b 85%
      ),
      url(${bgImg});
    background-size: cover;
  `;

  const Title = styled.h1`
    font-size: 2.4rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.5rem;
  `;

  const Subtitle = styled.p`
    font-family: "Esteban", serif;
    color: #606a70;
    font-size: 1.6rem;
    margin-bottom: 5rem;
  `;

  return (
    <Header>
      <Title>Cinepickr</Title>
      <Subtitle>pick the movie for you</Subtitle>
    </Header>
  );
};

export default Header;
