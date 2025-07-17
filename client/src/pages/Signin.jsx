import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const navigate = useNavigate()
  const url = 'http://localhost:5010/signin'


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("data", values);
      axios.post(url, values)
      .then((res)=>{
        console.log(res.data);
        navigate('/dashboard')    
      })
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("eMail is required"),
      password: Yup.string()
        .required("Enter a password")
        .min(8, "Your password must not be less than eight characters"),
    }),
  });




  return (
    <div className="container mt-5 col-lg-6 mx-auto shadow border py-4 rounded">
        <h2 className="mb-4 text-center">Login</h2>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email ? (
            <span className="text-danger">{formik.errors.email}</span>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password ? (
            <span className="text-danger">{formik.errors.password}</span>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signin;
