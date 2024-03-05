import React from "react";
import style from "./AdminLogin.module.css"
const AdminLogin = () => {
  return (
    <div className={style.main_container} id="main_container">
      <div className={style.sign_in_container}>
        <form id="loginForm">
          <div className={style.header}>
            <h1>Admin panel</h1>
            <h3>Sign in</h3>
          </div>
          <div className={style.signin_data}>
            <input type="email" id="email" placeholder="Email" name="email" />
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
            />
            <button type="button">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
