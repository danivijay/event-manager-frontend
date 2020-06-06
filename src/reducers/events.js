// follows Ducks pattern (https://github.com/erikras/ducks-modular-redux)
import axios from "axios";

const events = [
  {
    name: "Stack Hackathon",
    id: "123",
    desc:
      "Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.",
  },
  {
    name: "Sample Conference",
    id: "124",
    desc:
      "Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit.",
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

const baseURL = "https://to-do-expressjs.herokuapp.com/api/v1";

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
