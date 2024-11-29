import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/AuthApis";

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // useOnClickOutside(ref, () => setOpen(false))
  console.log("user", user);
  if (!user) return null;
  const imageUrl = user.image;

  return (
    <button
      className="relative group"
      onClick={() => setOpen(!open)}
    >
      {/* Profile Avatar */}
      <div className="flex items-center gap-x-2 group-hover:bg-richblack-700 p-2 rounded-md transition-all">
        <img
          src={imageUrl}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[40px] rounded-full object-cover border-2 border-blue-500 shadow-md"
        />
        <AiOutlineCaretDown className="text-md text-richblack-100 group-hover:text-blue-400 transition-colors" />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[120%] right-0 z-[1000] divide-y divide-richblack-700 rounded-lg border border-richblack-700 bg-richblack-800 shadow-lg w-48 overflow-hidden"
          ref={ref}
        >
          {/* Dashboard Link */}
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-x-2 py-3 px-4 text-sm text-richblack-100 hover:bg-blue-500 hover:text-white transition-all">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          {/* Logout Link */}
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex items-center gap-x-2 py-3 px-4 text-sm text-richblack-100 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
