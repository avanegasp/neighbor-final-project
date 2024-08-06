import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const handleSubmit = async(e) => {
    e.preventDefault()
    const response = await actions.login(email, password)
    console.log(response)
  }
  return (
    <div className="container d-flex flex-column min-vh-100">
      <div className="">
        <h1>Login</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group justify-content-center align-items-start">
          <label htmlFor="LoginEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="LoginEmail"
            value={(email)}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="LoginPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="LoginPassword"
            value={(password)}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit my-2" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div>
        {" "}
        <Link to={"/register"}>Have you registered yet? Click here!</Link>
      </div>
    </div>
  );
};

export default Login;
