import React, { useState, useEffect } from "react";
import { getRandomNumberInInterval } from "../../utils/getRandomNumberInInterval";
import backdropFilmsList from "../../data/backdropFilmsListWithDetails.json";
import styled from "@emotion/styled";

const Header = () => {
  const [bgImg, setBgImg] = useState("");

  useEffect(() => {
    const basePath = "https://image.tmdb.org/t/p/w1280/";
    const getRandomBackdrop =
      backdropFilmsList[getRandomNumberInInterval(0, 30)].backdrop_path;

    setBgImg(`${basePath}${getRandomBackdrop}`);
    return () => null;
  }, []);

  const Header = styled.header`
    position: relative;
    display: flex;
    justify-content: center;
    flex-flow: column;
    padding: 2.4rem;
    height: 20rem;
    @media (min-width: 80rem) {
      height: 50rem;
    }
  `;

  const Backdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    left: 0;
    right: 0;
    top: 0;
    background-position: top;
    background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.8) 20%,
        #14151b 85%
      ),
      url(${bgImg});
    background-size: cover;
    animation: fadeIn 1.5s;
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;

  const Title = styled.h1`
    font-size: 2.4rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.5rem;
    z-index: 1;
  `;

  const Subtitle = styled.p`
    font-family: "Esteban", serif;
    color: #606a70;
    font-size: 1.6rem;
    margin-bottom: 5rem;
    z-index: 1;
  `;

  return (
    <Header>
      <Title>Cinepickr</Title>
      <Subtitle>pick the movie for you</Subtitle>
      <Backdrop />
    </Header>
  );
};

export default Header;
