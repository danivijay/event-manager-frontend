import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Events = ({ events }) => {
  return (
    <div>
      <h1>Events</h1>
      {events &&
        events.length > 0 &&
        events.map((event) => (
          <NavLink key={event.id} to={`/event/${event.id}`}>
            <div>
              <h2>{event.name}</h2>
              <p>{event.desc}</p>
            </div>
          </NavLink>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { events: state.events.events };
};

export default connect(mapStateToProps)(Events);
