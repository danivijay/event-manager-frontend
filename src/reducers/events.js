// follows Ducks pattern (https://github.com/erikras/ducks-modular-redux)
import axios from "axios";
import { baseURL } from "../constants/generalConstants";

const events = [
  {
    name: "Stack Hackathon",
    id: "123",
    desc:
      "It’s true that being a specialist in one’s field and gaining mastery of a particular aspect of technology has distinct advantages, but as technology rapidly expands and evolves, industries are constantly changing. With this change comes the need for skills branching out to multiple technologies and the ability to build end to end products to potentially transform the way people live around the world!",
  },
  {
    name: "Sample Conference",
    id: "124",
    desc:
      "We are looking for prototypes that are innovative, technologically advanced and unique. Most importantly, we are looking for applications that help fuel innovation, industry growth and economy. Build a web applications/ products that help everyday task management efficient and event registration smooth and hassle-free. You can make a submission for both the themes or either of the theme mentioned below.",
  },
];

const initialState = {
  events: events,
};

const GET_EVENTS = "GET_EVENTS";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
};

export const getEvents = () => (dispatch) => {
  axios.get(`${baseURL}/events`).then((data) => {
    if (data?.data?.success) {
      dispatch({
        type: GET_EVENTS,
        payload: data?.data?.data,
      });
    }
  });
};

export default reducer;
