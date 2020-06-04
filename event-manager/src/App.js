import React from 'react';
import { useForm } from "react-hook-form";
import './App.css';

function App() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <div className="App">
      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input name="full_name" defaultValue="" ref={register({ required: true })} />
        {errors.full_name && <span>Fullname is required</span>}
        <label>Mobile Number</label>
        <input name="mobile" ref={register({ required: true })} />
        {errors.mobile && <span>Mobile number is required</span>}
        <label>Email Address</label>
        <input name="email" ref={register({
          required: "Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "invalid email address"
          }
        })} />
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
        <label>Number of Tickets</label>
        <input name="number_of_tickets" ref={register({ required: true })} />
        {errors.number_of_tickets && <span>Number of Tickets are required</span>}
        <label>Upload ID Card</label>
        <input type="file" id="id_card" name="id_card" accept="image/*" required></input>
        {errors.id_card && <span>ID Card required</span>}
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
