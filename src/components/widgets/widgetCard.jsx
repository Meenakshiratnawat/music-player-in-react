import React from "react";
import "./widgetCard.css";
import WidgetEntry from "./widgetEntry";
import { IconContext } from "react-icons";
import { FiChevronRight } from "react-icons/fi";

export default function WidgetCard({ title, similar, featured, newRelease }) {

  return (
    <div className="widgetcard-body">
  <p className="widget-title">{title}</p>
  {similar
    ? similar.map((artist, index) => (
        <WidgetEntry
          key={index}
          id={artist?.id} // Assuming each artist object has an id property
          title={artist?.name}
          subtitle={artist?.followers?.total + " Followers"}
          image={artist?.images[2]?.url}
        />
      ))
    : featured
    ? featured.map((playlist, index) => (
        <WidgetEntry
          key={index}
          id={playlist?.id} // Assuming each playlist object has an id property
          title={playlist?.name}
          subtitle={playlist?.tracks?.total + " Songs"}
          image={playlist?.images[0]?.url}
        />
      ))
    : newRelease
    ? newRelease.map((album, index) => (
        <WidgetEntry
          key={index}
          id={album?.id} // Assuming each album object has an id property
          title={album?.name}
          subtitle={album?.artists[0]?.name}
          image={album?.images[2]?.url}
        />
      ))
    : null}
  <div className="widget-fade">
    <div className="fade-button">
      <IconContext.Provider value={{ size: "24px", color: "#c4d0e3" }}>
        <FiChevronRight />
      </IconContext.Provider>
    </div>
  </div>
</div>

  );
}