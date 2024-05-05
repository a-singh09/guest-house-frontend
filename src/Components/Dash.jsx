import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/dash.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonPinIcon from "@mui/icons-material/PersonPin";
import BedroomParentRoundedIcon from "@mui/icons-material/BedroomParentRounded";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { NavLink } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import Header from "./Header";
import Approve from "./Approve";
import DashboardContent from "./DashboardContent";
import AdminUserProfile from "./AdminUserProfile";
import Button from '@mui/material/Button';
import AdminRoomBooking from "./AdminRoomBooking";
import BookedRooms from "./BookedRooms";
import ApproveBooking from "./BookingApproval/ApproveBooking";
import DashboardSettings from "./DashboardSettings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RegisteredUsers from "./RegisteredUsers";
import { Settings } from "@mui/icons-material";
import { useLoginContext } from "./ContextHooks/LoginContext";
import Container from "./BookingForm/Container";
import { useUserContext } from "./ContextHooks/UserContext";
import ManageAdmin from "./ManageAdmin";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AdminReport from "./AdminReports/AdminReport";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AdminBookingHistory from "./adminBookingHistory";
const Dash = ({ admin, isMainAdmin }) => {
  // console.log(admin);
  const { isAdm } = useLoginContext();
  console.log("admin context", isAdm);
  const [sideState, setSidestate] = useState(true);
  const [contentType, setContentType] = useState("dashboard");
  const [isGodAdmin, setGodAdmin] = useState(false);
  // useEffect for the data fetch for the curr user if curruser == "ghadmin@nitj.ac.in" setGodAdmin(true) by default false

  const [x, setX] = useState(window.innerWidth);




  useEffect(() => {
    const handleResize = () => {
      setX(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (isMainAdmin === true) {
      setGodAdmin(true);
    }
  }, [isMainAdmin]);

  // useEffect(() => {
  //   localStorage.setItem('isGodAdmin', JSON.stringify(isGodAdmin));
  // }, [isGodAdmin]);

  console.log(isGodAdmin);

  const ToggleSide = () => {
    setSidestate(!sideState);
  };
  const selectContent = (content) => {
    setContentType(content);
    if (x < 1000) {
      setSidestate(!sideState);
    }
    console.log(contentType);
  };

  const navigate = useNavigate();
  const { setIsLogged } = useLoginContext();
  const { userId } = useUserContext();

  console.log("user id", userId);

  const handleLogout = () => {
    fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        console.log("logout");

        // Clear local storage
        localStorage.clear();

        document.cookie.split(";").forEach((c) => {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        return res.json();
      })
      .then((data) => {
        if (data.message === "Logged out successfully") {
          setIsLogged(false);
          navigate("/login");
          // Reload the page after navigating to /login
          window.location.reload();
        } else {
          console.error("Error logging out");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  const contentComponents = {
    dashboard: <DashboardContent />,
    adminRoomBooking: (
      <Container adminId={userId} isAdmin={isAdm} />
    ),
    adminuserProfile: <AdminUserProfile />,
    settings: <DashboardSettings />,
    approve: <Approve />,
    approvebooking: <ApproveBooking />,
    bookedRooms: <BookedRooms />,
    registeredUsers: <RegisteredUsers />,
    adminReports: <AdminReport />,
    adminbooking: <AdminBookingHistory />,
    manageAdmins: <ManageAdmin />
  };

  const selectedContent = contentComponents[contentType];
  return (
    <>
      <Header />
      <div className="reponsive-sidepanel-header">
        {x < 1000 ? (
          <div className='burger' >
            <div className="btn-div">
              <IconButton onClick={ToggleSide}>
                {!sideState ? <MenuIcon style={{ color: 'white' }} />
                  : <ClearIcon style={{ color: 'white' }} />}
              </IconButton>
            </div>
          </div>
        ) : null}
      </div>
      <div className="dash-menu">
        {/*  <div className="admin-header" onClick={ToggleSidestate}>       
      </div> */}
        {sideState && (

          <div className="dash-sidebar">
            <div className="admin-title">
              <span style={{ cursor: 'pointer' }}>
                <AdminPanelSettingsIcon />
                Admin Panel
              </span>
            </div>
            <div className="dash-wrapper">
              {/* <div className='side-title'> Administration</div> */}
              <li style={{ cursor: 'pointer' }}>
                <div
                  onClick={() => selectContent("dashboard")}
                  className="dash-optn"
                >
                  <span>
                    <DashboardIcon />
                    Dashboard
                  </span>
                </div>
                <div
                  onClick={() => selectContent("adminRoomBooking")}
                  className="dash-optn"
                >
                  <span>
                    <BedroomParentRoundedIcon />
                    Admin Room Booking
                  </span>
                </div>

                <div

                  onClick={() => selectContent("approve")}
                  className="dash-optn"
                 >
                  <span>
                    <PersonAddIcon />
                    Approve Registrations
                  </span>
                </div>


                <div
                  onClick={() => selectContent("approvebooking")}
                  className="dash-optn"
                >
                  <span>
                    <AssignmentTurnedInIcon />
                    Approve Bookings
                  </span>
                </div>






                <div
                  // onClick={() => selectContent("approve")}
                  onClick={() => selectContent("bookedRooms")}
                  className="dash-optn"
                >
                  <span>
                    <TaskAltIcon />
                    Booked Rooms
                  </span>
                </div>


                <div
                  onClick={() => selectContent("registeredUsers")}
                  className="dash-optn"
                >
                  <span>
                    <HowToRegRoundedIcon />
                    Registered Users
                  </span>
                </div>
                <div
                  onClick={() => selectContent("adminReports")}
                  className="dash-optn"
                >
                  <span>
                    <AssessmentIcon />
                    Report
                  </span>
                </div>
                <div
                  onClick={() => selectContent("adminbooking")}
                  className="dash-optn"
                >
                  <span>
                    <AssignmentTurnedInIcon />
                    Booking History
                  </span>
                </div>

                {isGodAdmin ? (
                  <div
                    onClick={() => selectContent("manageAdmins")}
                    className="dash-optn"
                  >
                    <span>
                      <GroupAddIcon />
                      Manage Admins
                    </span>
                  </div>
                ) : null}
              </li>
              <div className="admin-title">
                <span style={{ cursor: 'pointer' }}>
                  <SupervisorAccountIcon />
                  Admin
                </span>
              </div>
              <li style={{ cursor: 'pointer' }}>
                <div
                  onClick={() => selectContent("adminuserProfile")}
                  className="dash-optn"
                >
                  <span>
                    <PersonPinIcon />
                    Profile
                  </span>
                </div>
                <div
                  onClick={() => selectContent("settings")}
                  className="dash-optn"
                >
                  <span>
                    <SettingsIcon />
                    Settings
                  </span>
                </div>
                <div onClick={handleLogout} className="dash-optn">
                  <span>
                    <LogoutIcon />
                    Logout
                  </span>
                </div>
              </li>
            </div>{" "}

          </div>

        )}
        <div className="dash-area">
          <div className="dash-box">{selectedContent}</div>
        </div>
      </div>
    </>
  );
};

export default Dash;


