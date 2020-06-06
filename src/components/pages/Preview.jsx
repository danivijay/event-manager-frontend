import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addEventRegistration } from "../../reducers/eventRegistration";

const Preview = ({ previewData, submitData }) => {
  const history = useHistory();
  const { id: eventId } = useParams();
  useEffect(() => {
    if (previewData.email === "") {
      history.push(`/event/${eventId}`);
    }
  }, [eventId, history, previewData]);

  const handleSubmitData = () => {
    submitData(previewData);
  };

  return (
    <div>
      <h2>Preview</h2>
      <p>{previewData.email}</p>
      <p>{previewData.full_name}</p>
      <p>{previewData.mobile}</p>
      <p>{previewData.number_of_tickets}</p>
      <p>{previewData.registration_type}</p>
      <p>{previewData.url}</p>
      <button onClick={() => handleSubmitData()}>Confirm and Submit</button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    previewData: state?.eventRegistration?.eventRegistrationDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitData: (payload) => dispatch(addEventRegistration(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
