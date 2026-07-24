import { SquareArrowRightExit } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../redux/states";

const Header = () => {

  const [click, setClick] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser: any = useSelector((state: any) => state.user);
  const handleFunc = () => {
    setClick(true)
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setTimeout(()=>{
          message.success("Logout Sucessfull!")
          dispatch(logout())
          navigate("/login")
        },1000)
      })
      .catch((error) => {
        console.log(error)
        message.error(`Error in Logout`)
      });
  };
  return (
    <div className="flex flex-col sm:flex-row gap-4  justify-between p-4 items-center">
      <h2 className="text-2xl sm:text-3xl font-bold">Polling Web App</h2>
      <div className="flex gap-8 items-center">
        <p className="text-sm">{currentUser?.email}</p>
        <button
        disabled={click ? true : false}
          onClick={() => {
            handleFunc();
          }}
          className="group gap-2 relative flex items-center justify-center rounded-2xl border-none bg-gradient-to-br from-[#3FA35E] to-[#1F6D3B] px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_18px_-4px_rgba(31,109,59,0.4)] transition-all duration-200  hover:shadow-[0_10px_22px_-2px_rgba(31,109,59,0.45)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#3FA35E] focus:ring-offset-2"
        >
          <SquareArrowRightExit />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Header;