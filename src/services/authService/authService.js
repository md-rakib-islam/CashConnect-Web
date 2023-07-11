import { FACEBOOK_LOGIN_URL, GOOGLE_LOGIN_URL } from "@data/constants";
import axios from "axios";

class AuthService {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  signInWithFacebook = (auth_token) => {
    return new Promise((resolve, reject) => {
      console.log(FACEBOOK_LOGIN_URL);
      axios
        .post(`${FACEBOOK_LOGIN_URL}`, {
          auth_token: auth_token.authResponse.accessToken,
        })
        .then((response) => {
          console.log("loginRes", response);
          if (response) {
            localStorage.removeItem("UserId");
            localStorage.setItem("UserId", response.data.id);
            localStorage.removeItem("userType");
            localStorage.setItem("userType", response.data.user_type);
            localStorage.removeItem("userPassword");
            this.setSession(`Bearer ${response.data.access}`);
            const user = {
              email: response.data.email,
              primary_phone: response.data.primary_phone,
              displayName: response.data.username,
              photoURL: response.data.image,
              role: response.data.role,
              id: response.data.id,
              user_type: response.data.user_type,
            };
            resolve(user);
          }
        })
        .catch((rer) => {
          if (rer.response.status == 403) {
            reject(rer);
          } else if (rer.response.status == 401) {
            reject(rer);
          } else {
            reject(rer);
          }
          console.log("rer.response.status", rer.response.status);
        });
    });
  };
  signInWithGoogle = (auth_token) => {
    return new Promise((resolve, reject) => {
      console.log(GOOGLE_LOGIN_URL);
      axios
        .post(`${GOOGLE_LOGIN_URL}`, {
          auth_token: auth_token,
        })
        .then((response) => {
          console.log("loginRes", response);
          if (response) {
            localStorage.removeItem("UserId");
            localStorage.setItem("UserId", response.data.id);
            localStorage.removeItem("userType");
            localStorage.setItem("userType", response.data.user_type);
            localStorage.removeItem("userPassword");
            this.setSession(`Bearer ${response.data.access}`);
            const user = {
              email: response.data.email,
              primary_phone: response.data.primary_phone,
              displayName: response.data.username,
              photoURL: response.data.image,
              role: response.data.role,
              id: response.data.id,
              user_type: response.data.user_type,
            };
            resolve(user);
          }
        })
        .catch((rer) => {
          if (rer.response.status == 403) {
            reject(rer);
          } else if (rer.response.status == 401) {
            reject(rer);
          } else {
            reject(rer);
          }
          console.log("rer.response.status", rer.response.status);
        });
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
    } else {
      localStorage.removeItem("jwt_access_token");
      localStorage.removeItem("UserId");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };
}

const instance = new AuthService();

export default instance;
