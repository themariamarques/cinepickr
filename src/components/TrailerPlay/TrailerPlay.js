import React, { useState } from "react";
import IconPlay from "../IconPlay";
import Styles from "./TrailerPlay.module.css";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { useMediaQuery } from "react-responsive";

const TrailerPlay = ({ trailer }) => {
  const [isTrailerModalOpen, setTrailerModalOpen] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)"
  });

  const customStyles = {
    content: {
      top: "50%",
      minHeight: "390px",
      minWidth: "640px",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1
    }
  };

  if (!trailer) {
    return null;
  }

  const Component = isDesktopOrLaptop ? "div" : "a";

  return (
    <>
      {isDesktopOrLaptop && (
        <Modal
          isOpen={isTrailerModalOpen}
          onRequestClose={() => setTrailerModalOpen(false)}
          overlayClassName={Styles.modalOverlay}
          style={customStyles}
        >
          <YouTube videoId={trailer.key} opts={opts} />
        </Modal>
      )}
      <Component
        className={Styles.posterOverlay}
        {...(!isDesktopOrLaptop && {
          href: `https://www.youtube.com/watch?v=${trailer.key}`
        })}
        {...(isDesktopOrLaptop && {
          onClick: () => setTrailerModalOpen(true),
          role: "button"
        })}
      >
        <IconPlay />
      </Component>
    </>
  );
};

export default TrailerPlay;
