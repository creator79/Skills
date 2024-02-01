import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ showName }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ticketQuantity: 1,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    ticketQuantity: "",
  });
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear previous error messages when input changes
    setErrors({
      ...errors,
      [e.target.name]: "", // Clear error message for the changed input field
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields
    let formValid = true;
    const newErrors = { ...errors };

    if (formData.name.trim() === "") {
      newErrors.name = "Please enter your name.";
      formValid = false;
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Please enter your email.";
      formValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      formValid = false;
    }

    if (formData.ticketQuantity <= 0 || isNaN(formData.ticketQuantity)) {
      newErrors.ticketQuantity = "Please enter a valid quantity.";
      formValid = false;
    }

    if (formValid) {
      // Handle form submission
      localStorage.setItem("formData", JSON.stringify(formData));
      alert("Form submitted!");
      console.log("Form submitted:", formData);
      Navigate("/")
    } else {
      // Update errors state with new error messages
      setErrors(newErrors);
    }
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
        <h1 className="text-3xl font-bold mt-5 flex mx-auto justify-center text-white">BOOKING PAGE </h1>
      <form className="max-w-sm mx-auto mt-[150px]  " onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`bg-white border ${
              errors.name ? "border-red-500" : "border-green-500"
            } text-green-900 bg-white text-sm rounded-lg focus:ring focus:outline-none focus:border ${
              errors.name ? "red" : "green"
            }-500 block w-full p-2.5 dark:bg-white dark:border-black`}
            placeholder="Type Your Name Here"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Error:</span> {errors.name}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white dark:text-white"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`bg-white border ${
              errors.email ? "border-red-500" : "border-green-500"
            } text-green-900 bg-white text-sm rounded-lg focus:ring focus:outline-none focus:border ${
              errors.email ? "red" : "green"
            }-500 block w-full p-2.5 dark:bg-white dark:border-black`}
            placeholder="example@example.com"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Error:</span> {errors.email}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="quantity"
            className="block mb-2 text-sm font-medium text-white dark:text-white"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="ticketQuantity"
            value={formData.ticketQuantity}
            onChange={handleChange}
            className={`bg-white border ${
              errors.ticketQuantity ? "border-red-500" : "border-green-500"
            } text-green-900 bg-white text-sm rounded-lg focus:ring focus:outline-none focus:border ${
              errors.ticketQuantity ? "red" : "green"
            }-500 block w-full p-2.5 dark:bg-white dark:border-black`}
            placeholder="Select Quantity"
          />
          {errors.ticketQuantity && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Error:</span>{" "}
              {errors.ticketQuantity}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default BookingForm;
