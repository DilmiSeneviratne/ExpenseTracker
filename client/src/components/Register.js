import React, { useState } from "react";



function Register() {
    const [formData, setFormData]=useState({
        username:'',
        email:'',
        password:''
    });

    const [errors, setErrors] = useState({});

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    };

    const validateForm=()=>{
        let formErrors={};
        if(!formData.username) formErrors.username='username is required';
        if(!formData.email){
            formErrors.email='Email is required';
        }else if(!/\S+@\S+\.\S+/.test(formData.email)){
            formErrors.email='Email is invalid';
        }

        if(!formData.password){
            formErrors.password='Password is required';
        }else if(formData.password.length < 6){
            formErrors.password='Password must be at least 6 character';
        }
        return formErrors;
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        const formErrors=validateForm();
        if(Object.keys(formErrors).length===0){
            console.log('Form submitted successfully', formData);
            //perform registration logic here
        }else{
            setErrors(formErrors);
        }
    };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
