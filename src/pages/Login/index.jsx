import { useEffect, useState } from "react";
import "./loginpage.css";
import axios from "axios";
import Cookies from "js-cookies";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const token = Cookies.getItem("token");
  const navigation = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const login = await axios.post(
        "https://rich-red-eagle-cap.cyclic.app//auth/signin",
        { email: email, password: password }
      );
      Cookies.setItem("token", login.data.data);
      alert("Login Berhasil!");
      navigation("/");
    } catch (error) {
      alert("Akun Salah!");
    }
  };
  useEffect(() => {
    if (token) {
      navigation("/");
    } else {
      return;
    }
  }, [token]);
  return (
    <div className="container-login">
      <div className="login-img">
        <img src="/logo3.jpg" alt="" />
      </div>
      <div className="login-contain">
        <div className="logo-container">
          <img className="logo-img-1" src="/logo1.png" alt="" />
          <img className="logo-img-2" src="/logo2.png" alt="" />
        </div>
        <form onSubmit={handlelogin} className="login-form">
          <h1>Login</h1>
          <div className="form-login-group">
            <div>
              <label>Email:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="E-mail"
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
