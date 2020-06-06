import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { fileEngineURL } from "../../constants/generalConstants";
import { connect } from "react-redux";
import { addEventRegistrationPreview } from "../../reducers/eventRegistration";

const Form = ({ formData, addToPreview }) => {
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: formData,
  });
  const [loading, setloading] = useState(false);
  const [fileUrl, setfileUrl] = useState("");

  const { id: eventId } = useParams();
  const history = useHistory();
  const onSubmit = (data) => {
    console.log(data);
    addToPreview(data);
    history.push(`/event/${eventId}/preview`);
  };

  const uniqId = uuidv4();

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("fileContent", file);
    formData.append("fileProject", "event_manager");
    formData.append("fileUniqId", uniqId);
    setloading(true);
    try {
      const data = await axios.post(`${fileEngineURL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data?.data?.success) {
        const urlPath = data?.data?.url;
        setfileUrl(`${fileEngineURL}${urlPath}`);
      }
      setloading(false);
    } catch (e) {
      console.log(e);
      setloading(false);
    }
  };

  const registration_type = watch("registration_type");
  return (
    <div>
      <h2>{eventId}</h2>
      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input
          name="full_name"
          defaultValue=""
          ref={register({ required: true })}
        />
        {errors.full_name && <span>Fullname is required</span>}
        <label>Mobile Number</label>
        <input name="mobile" ref={register({ required: true })} />
        {errors.mobile && <span>Mobile number is required</span>}
        <label>Email Address</label>
        <input
          name="email"
          ref={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address",
            },
          })}
        />
        {errors.email && <span>Email is required</span>}
        <label>Registration Type</label>
        <select name="registration_type" ref={register({ required: true })}>
          <option value="">Select</option>
          <option value="Self">Self</option>
          <option value="Group">Group</option>
          <option value="Corporate">Corporate</option>
          <option value="Others">Others</option>
        </select>
        {errors.registration_type && <span>Registration Type is required</span>}

        {registration_type !== "" && registration_type !== "Self" && (
          <Fragment>
            <label>Number of Tickets</label>
            <input
              name="number_of_tickets"
              ref={register({ required: true })}
            />
            {errors.number_of_tickets && (
              <span>Number of Tickets are required</span>
            )}
          </Fragment>
        )}
        <label>Upload ID Card</label>
        <input
          type="file"
          id="id_card"
          name="id_card"
          accept="image/*"
          required
          onChange={(e) => handleUploadFile(e)}
        ></input>
        <input
          type="hidden"
          name="url"
          value={fileUrl}
          ref={register({ required: true })}
        ></input>
        {errors.url && <span>ID Card is required</span>}
        <input type="submit" disabled={loading} />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state?.events?.events,
    formData: state?.eventRegistration?.eventRegistrationDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToPreview: (payload) => dispatch(addEventRegistrationPreview(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
