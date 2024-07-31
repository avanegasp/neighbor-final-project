import React from "react";

const Login = () => {
  return (
    <div className="card mx-5 p-2 gap my-2">
      <form>
        <div className="form-group">
          <label htmlFor="LoginEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="LoginEmail"
            aria-describedby="emailHelp"
            placeholder="Enter email"
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
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
