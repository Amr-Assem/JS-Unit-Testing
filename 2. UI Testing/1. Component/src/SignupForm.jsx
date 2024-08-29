import React, { useState } from "react";

function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validation = () => {
    const errors = {};
    if (!formData.age || isNaN(formData.age) || formData.age < 18) {
      errors.age = "Age must be a number and at least 18";
    }
    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Valid email is required";
    }
    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validation();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        {errors.username && <span role="alert">{errors.username}</span>}
      </div>

      <div>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        {errors.age && <span role="alert">{errors.age}</span>}
      </div>

      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <span role="alert">{errors.email}</span>}
      </div>

      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        {errors.password && <span role="alert">{errors.password}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignupForm;