import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const navigate = useNavigate()
  const url = 'https://onlyfanspro.onrender.com/signin'


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    initialStatus: null,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setStatus(null);
      console.log("data", values);
      axios.post(url, values)
      .then((res)=>{
        console.log(res.data);
        // Show any backend success message
        if (res?.data?.message) {
          setStatus({ type: 'success', message: res.data.message });
        }
        navigate('/dashboard')
      })
      .catch((err)=>{
        const msg = err?.response?.data?.message || err?.response?.data || err?.message || 'Request failed';
        setStatus({ type: 'danger', message: msg });
        console.log('Signin error:', msg);
      })
      .finally(()=> setSubmitting(false));
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("eMail is required"),
      password: Yup.string()
        .required("Enter a password")
        .min(8, "Your password must not be less than eight characters"),
    }),
  });




  return (
    <div className="min-vh-100 d-flex flex-column" style={{background: 'linear-gradient(135deg, #0f172a 0%, #111827 35%, #0b1020 100%)'}}>
      {/* Top nav / brand */}
      <nav className="navbar navbar-dark bg-transparent py-3">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2" href="#" onClick={(e)=>e.preventDefault()}>
            <img src="/logo.svg" alt="OnlyFansPro" height="28" className="me-1" />
            <span className="fw-bold" style={{letterSpacing: '.5px'}}>OnlyFansPro</span>
          </a>
        </div>
      </nav>

      {/* Centered sign-in card */}
      <div className="container flex-grow-1 d-flex align-items-center py-5">
        <div className="row w-100 justify-content-center">
          <div className="col-12 col-md-10 col-lg-6">
            <div className="card shadow-lg border-0" style={{borderRadius: '1rem'}}>
              <div className="card-body p-4 p-md-5">
                <h3 className="fw-semibold mb-1">Welcome back</h3>
                <p className="text-muted mb-4 small">Sign in to access exclusive content and messages.</p>
                {formik.status?.message ? (
                  <div className={`alert alert-${formik.status.type || 'info'} py-2 small`} role="alert">
                    {formik.status.message}
                  </div>
                ) : null}
                <form onSubmit={formik.handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label small">Email</label>
                    <div className="input-group input-group-sm">
                      <span className="input-group-text bg-light"><i className="bi bi-envelope"></i></span>
                      <input
                        type="email"
                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        placeholder="you@example.com"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="password" className="form-label small">Password</label>
                    <div className="input-group input-group-sm">
                      <span className="input-group-text bg-light"><i className="bi bi-lock"></i></span>
                      <input
                        type="password"
                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                        name="password"
                        placeholder="Your password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <a href="#" className="small text-decoration-none" onClick={(e)=>e.preventDefault()}>Forgot password?</a>
                  </div>
                  <div className="d-grid">
                    <button type="submit" disabled={formik.isSubmitting} className="btn btn-info text-dark fw-semibold rounded-pill">
                      <i className="bi bi-box-arrow-in-right me-1"></i>
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer tease */}
      <footer className="py-4 bg-transparent">
        <div className="container d-flex flex-wrap justify-content-between align-items-center gap-2 small text-white-50">
          <div>© {new Date().getFullYear()} OnlyFansPro — Built for creators</div>
          <div className="d-flex gap-3">
            <a href="#" className="link-light text-decoration-none" onClick={(e)=>e.preventDefault()}>Help</a>
            <a href="#" className="link-light text-decoration-none" onClick={(e)=>e.preventDefault()}>Safety</a>
            <a href="#" className="link-light text-decoration-none" onClick={(e)=>e.preventDefault()}>Pricing</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Signin;
