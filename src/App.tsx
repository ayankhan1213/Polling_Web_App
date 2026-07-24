import { Navigate, Route, Routes} from "react-router-dom";
import PollPage from "./pages/PollPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { login } from "./redux/states";
const App = () => {
  const [loading, setLoading] = useState(true);
  const checkUser = useSelector((state: any) => state.user);

  const dispatch = useDispatch();
  const getFirebaseUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          email: user.email,
          uid: user.uid,
        };
          dispatch(login(userData));
        } else {
        console.log("User not Logged In");
      }
      setLoading(false)
    });

  };


  useEffect(() => {
      getFirebaseUser();
  }, []);


  {/* // Loading Animation when Page Refresh */}
  if(loading){
    return (
       <div>
          <div className="h-screen flex justify-center items-center">
            <div className="inline-flex" role="status" aria-label="loading">
              <svg
                className="animate-spin shrink-0 size-8 text-[#328D50]"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM3.13375 12C3.13375 16.8967 7.10331 20.8662 12 20.8662C16.8967 20.8662 20.8662 16.8967 20.8662 12C20.8662 7.10331 16.8967 3.13375 12 3.13375C7.10331 3.13375 3.13375 7.10331 3.13375 12Z"
                  fill="currentColor"
                  opacity="0.2"
                />
                <path
                  d="M12 0C9.62662 -2.83022e-08 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913446 7.4078C0.00519403 9.60051 -0.232446 12.0133 0.230577 14.3411C0.693599 16.6689 1.83649 18.8071 3.51472 20.4853L5.73062 18.2694C4.49065 17.0294 3.64622 15.4496 3.30412 13.7297C2.96201 12.0098 3.13759 10.2271 3.80866 8.60703C4.47972 6.98694 5.61613 5.60222 7.07418 4.62798C8.53222 3.65375 10.2464 3.13375 12 3.13375L12 0Z"
                  fill="currentColor"
                />
              </svg>

              <span className="sr-only">Loading...</span>
            </div>
          </div>
      </div>
    )
  }
  return (
    <>
     

      {/* Routes  */}
      <Routes>
        {checkUser ? (
          <>
            <Route path="/" element={<PollPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
      
    </>
  );
};

export default App;
