import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "../DesignSystem/Button";

const Divider = styled.hr`
  border-top: 1px solid #ffffff;
`;

const Events = ({ events }) => {
  return (
    <div>
      {events &&
        events.length > 0 &&
        events.map((event, i) => (
          <Fragment>
            <div>
              <h3>Event {i + 1}</h3>
              <h2>{event.name}</h2>
              <p>{event.desc}</p>
              <NavLink
                key={event.id}
                to={`/event/${event.id}`}
                style={{ textDecoration: "None", color: "black" }}
              >
                <Button fullWidth>Register</Button>
              </NavLink>
            </div>
            {i !== events.length - 1 && <Divider />}
          </Fragment>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { events: state.events.events };
};

export default connect(mapStateToProps)(Events);
