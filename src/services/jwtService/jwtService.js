/* eslint-disable camelcase */
import { LOGIN_URL } from "@data/constants";
import axios from "axios";
// import jwtDecode from "jwt-decode";

class JwtService {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  //   setInterceptors = () => {
  //     axios.interceptors.response.use(
  //       (response) => {
  //         return response;
  //       },
  //       (err) => {
  //         return new Promise((resolve, reject) => {
  //           if (
  //             err.response.status === 401 &&
  //             err.config &&
  //             !err.config.__isRetryRequest
  //           ) {
  //             // if you ever get an unauthorized response, logout the user
  //             this.emit("onAutoLogout", "Invalid access_token");
  //             this.setSession(null);
  //           }
  //           throw err;
  //         });
  //       }
  //     );
  //   };

  //   handleAuthentication = () => {
  //     const access_token = this.getAccessToken();

  //     if (!access_token) {
  //       this.emit("onNoAccessToken");

  //       return;
  //     }

  //     if (this.isAuthTokenValid(access_token)) {
  //       this.setSession(access_token);
  //       this.emit("onAutoLogin", true);
  //     } else {
  //       this.setSession(null);
  //       this.emit("onAutoLogout", "access_token expired");
  //     }
  //   };

  //   createUser = (data) => {
  //     return new Promise((resolve, reject) => {
  //       axios.post("/api/auth/register", data).then((response) => {
  //         if (response.data.user) {
  //           this.setSession(response.data.access_token);
  //           resolve(response.data.user);
  //         } else {
  //           reject(response.data.error);
  //         }
  //       });
  //     });
  //   };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      console.log(LOGIN_URL);
      axios
        .post(`${LOGIN_URL}`, { email: email, password: password })
        .then((response) => {
          if (response) {
            localStorage.removeItem("UserId");
            localStorage.setItem("UserId", response.data.id);
            localStorage.removeItem("userPassword");
            localStorage.setItem("userPassword", password);
            this.setSession(`Bearer ${response.data.access}`);
            const user = {
              email: response.data.email,
              displayName: response.data.username,
              photoURL: response.data.image,
              role: response.data.role,
              id: response.data.id,
            };
            resolve(user);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  //   signInWithToken = () => {
  //     return new Promise((resolve, reject) => {
  //       axios
  //         .get("/api/auth/access-token", {
  //           data: {
  //             access_token: this.getAccessToken(),
  //           },
  //         })
  //         .then((response) => {
  //           if (response.data.user) {
  //             this.setSession(response.data.access_token);
  //             resolve(response.data.user);
  //           } else {
  //             this.logout();
  //             reject(new Error("Failed to login with token."));
  //           }
  //         })
  //         .catch((error) => {
  //           this.logout();
  //           reject(new Error("Failed to login with token."));
  //         });
  //     });
  //   };

  //   updateUserData = (user) => {
  //     return axios.post("/api/auth/user/update", {
  //       user,
  //     });
  //   };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      // delete axios.defaults.headers.common.Authorization;
      // axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("jwt_access_token");
      localStorage.removeItem("UserId");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };

  //   isAuthTokenValid = (access_token) => {
  //     if (!access_token) {
  //       return false;
  //     }
  //     const decoded = jwtDecode(access_token);
  //     const currentTime = Date.now() / 1000;
  //     if (decoded.exp < currentTime) {
  //       console.warn("access token expired");
  //       return false;
  //     }

  //     return true;
  //   };

  //   getAccessToken = () => {
  //     return window.localStorage.getItem("jwt_access_token");
  //   };
}

const instance = new JwtService();

export default instance;
