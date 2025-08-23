import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Signup = () => {
  const navigate = useNavigate()
  const url = 'http://localhost:5010/signup'


const formik = useFormik({
    initialValues: {
        firstName: '',
        lastName : '',
        email : '',
        password : ''
    }, 
  initialStatus: null,
  onSubmit: (values, { setStatus, setSubmitting }) => {
    setStatus(null);
    console.log('data', values);
    axios.post(`${url}`, values)
    .then((res)=>{
      console.log('response:', res);
      // optional success feedback
      if (res?.data?.message) {
        setStatus({ type: 'success', message: res.data.message });
      }
      if(res.status === 201){
        navigate('/signin')
      }
    })
    .catch((err)=>{
      const msg = err?.response?.data?.message || err?.response?.data || err?.message || 'Request failed';
      setStatus({ type: 'danger', message: msg });
      console.log('Signup error:', msg);
    })
    .finally(()=> setSubmitting(false));
  },
    validationSchema: Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName : Yup.string().required('Last name is required'),
        email : Yup.string().email('Invalid email').required('eMail is required'),
        password : Yup.string().required('Enter a password').min(8, 'Your password must not be less than eight characters')
    })

})


  // console.log(formik.errors);

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

      {/* Hero + card */}
      <div className="container flex-grow-1 d-flex align-items-center py-5">
        <div className="row w-100 align-items-center g-4">
          {/* Left: pitch */}
          <div className="col-12 col-lg-6 text-white">
            <h1 className="display-5 fw-bold mb-3">
              Join a creator-first community
            </h1>
            <p className="lead opacity-75 mb-4">
              Subscribe to exclusive content, support your favorite creators, and unlock members-only posts, messages, and live sessions.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <div className="d-flex align-items-center text-info">
                <i className="bi bi-shield-check me-2"></i>
                <span className="small">Secure payments</span>
              </div>
              <div className="d-flex align-items-center text-info">
                <i className="bi bi-chat-dots me-2"></i>
                <span className="small">DM your creators</span>
              </div>
              <div className="d-flex align-items-center text-info">
                <i className="bi bi-camera-video me-2"></i>
                <span className="small">Exclusive streams</span>
              </div>
            </div>
          </div>

          {/* Right: signup card */}
          <div className="col-12 col-lg-6">
            <div className="card shadow-lg border-0 overflow-hidden" style={{borderRadius: '1rem'}}>
              <div className="row g-0">
                <div className="col-12 bg-white">
                  <div className="p-4 p-md-5">
                    <h3 className="fw-semibold mb-1">Create your account</h3>
                    <p className="text-muted mb-4 small">Start your journey in minutes. It’s free.</p>
                    {formik.status?.message ? (
                      <div className={`alert alert-${formik.status.type || 'info'} py-2 small`} role="alert">
                        {formik.status.message}
                      </div>
                    ) : null}
                    <form onSubmit={formik.handleSubmit} noValidate>
                      <div className="row g-3">
                        <div className="col-12 col-sm-6">
                          <label htmlFor="firstName" className="form-label small">First name</label>
                          <input type="text" className={`form-control form-control-sm ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`} name='firstName' placeholder="Jane" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                          {formik.touched.firstName && formik.errors.firstName ? (
                            <div className="invalid-feedback">{formik.errors.firstName}</div>
                          ) : null}
                        </div>
                        <div className="col-12 col-sm-6">
                          <label htmlFor="lastName" className="form-label small">Last name</label>
                          <input type="text" className={`form-control form-control-sm ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`} name='lastName' placeholder="Doe" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                          {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="invalid-feedback">{formik.errors.lastName}</div>
                          ) : null}
                        </div>
                        <div className="col-12">
                          <label htmlFor="email" className="form-label small">Email</label>
                          <div className="input-group input-group-sm">
                            <span className="input-group-text bg-light"><i className="bi bi-envelope"></i></span>
                            <input type="email" className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} name='email' placeholder="Enter your eMail address" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.email && formik.errors.email ? (
                              <div className="invalid-feedback">{formik.errors.email}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="password" className="form-label small">Password</label>
                          <div className="input-group input-group-sm">
                            <span className="input-group-text bg-light"><i className="bi bi-lock"></i></span>
                            <input type="password" className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} name='password' placeholder="Enter your eMail password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.password && formik.errors.password ? (
                              <div className="invalid-feedback">{formik.errors.password}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-12 d-grid">
                          <button type="submit" disabled={formik.isSubmitting} className="btn btn-info text-dark fw-semibold rounded-pill">
                            <i className="bi bi-person-plus me-1"></i>
                            Create account
                          </button>
                        </div>
                      </div>
                    </form>
                    <div className="text-center mt-3 small">
                      By creating an account, you agree to our <a href="#" className="text-decoration-none" onClick={(e)=>e.preventDefault()}>Terms</a> and <a href="#" className="text-decoration-none" onClick={(e)=>e.preventDefault()}>Privacy</a>.
                    </div>
                  </div>
                </div>
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
}

export default Signup