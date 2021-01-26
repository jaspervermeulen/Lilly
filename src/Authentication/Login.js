import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base.js";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div>
      <h1>Welkom op de Licht en Liefde app, meld je hieronder aan!</h1>
      <form onSubmit={handleLogin}>
        <label>
          E-mailadres
          <input name="email" type="email" placeholder="email" />
        </label>
        <br />
        <label>
          Wachtwoord
          <input name="password" type="password" placeholder="password" />
        </label>
        <br />
        <button type="submit">Meld je aan</button>
      </form>
    </div>
  )
}

export default withRouter(Login);