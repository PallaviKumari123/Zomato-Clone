import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

let Base_url = "http://localhost:5001/api/";

const Header = (props) => {
  let onSuccess = (credentialResponse) => {
    let token = credentialResponse.credential;
    try {
      let data = jwt_decode(token);
      // save in browser
      localStorage.setItem("zc_auth_token", token);
      // reload page
      alert("Welcome user, Login successfully");
      window.location.assign("/");
    } catch (error) {
      console.log(error);
      // remove data from local storage
      localStorage.removeItem("zc_auth_token");
    }
  };
  let onError = () => {
    console.log("Login Failed");
  };

  let logout = () => {
    let isLogout = window.confirm("Are you sure logout");
    if (isLogout) {
      localStorage.removeItem("zc_auth_token");
      window.location.reload();
    }
  };
  return (
    <>
      <GoogleOAuthProvider clientId="862455110660-l3s4lg5apkns739gss4elhhmus9l10rp.apps.googleusercontent.com">
        <div
          className="modal fade"
          id="login"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Login
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <GoogleLogin onSuccess={onSuccess} onError={onError} />;
              </div>
            </div>
          </div>
        </div>

        <div className="col-11 d-flex justify-content-between py-2">
          {props.logo === false ? <p></p> : <p className="m-0 brandtwo d-flex justify-content-center align-items-center fw-bolder bg-white">e!</p>}

          <div>
            {props.user ? (
              <> 
                <button className="btn btn-light">
                  {props.user.name}
                </button>
                <button className="btn btn-warning mx-2" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <button
                className="btn btn-outline-light"
                data-bs-toggle="modal"
                data-bs-target="#login"
              >
                Login
              </button>
            )}

            </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export {Base_url, Header};