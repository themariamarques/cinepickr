import React, { useState } from "react";
import IconPlay from "../IconPlay";
import Styles from "./TrailerPlay.module.css";
import Modal from "react-modal";
import YouTube from "react-youtube";

const TrailerPlay = ({ trailer }) => {
  const [isTrailerModalOpen, setTrailerModalOpen] = useState(false);

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

  return (
    <>
      <Modal
        isOpen={isTrailerModalOpen}
        onRequestClose={() => setTrailerModalOpen(false)}
        overlayClassName={Styles.modalOverlay}
        style={customStyles}
      >
        <YouTube videoId={trailer.key} opts={opts} />
      </Modal>
      <div
        className={Styles.posterOverlay}
        href={`https://www.youtube.com/watch?v=${trailer.key}`}
        onClick={() => setTrailerModalOpen(true)}
        role="button"
      >
        <IconPlay />
      </div>
    </>
  );
};

export default TrailerPlay;
