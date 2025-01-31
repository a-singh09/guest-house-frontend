import react, { useState, useEffect } from "react";
import "./DashInfo.css";
import HomeIcon from "@mui/icons-material/Home";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PersonIcon from "@mui/icons-material/Person";
import {Link} from "react-router-dom";
const DashInfo = () => {
  const [pendingUser, setPendingUser] = useState(0);
  const [pendingBooking, setPendingBooking] = useState(0);
  const [registeredUsers, setRegisteredUsers] = useState(0);
  const [guestHouses, setGuestHouses] = useState([]);
  const [availableRooms, setAvailableRooms] = useState(new Array(3).fill(0));
  const [bookedRooms, setBookedRooms] = useState(new Array(3).fill(0));
  console.log(availableRooms, bookedRooms);

  useEffect(() => {
    if (guestHouses.length > 0) {
      guestHouses.forEach((guestHouse, index) => {
        let rooms = guestHouse.rooms;
        let availableCount = 0;
        let bookedCount = 0;
        for (let i = 0; i < rooms.length; i++) {
          if (rooms[i] === false) {
            availableCount++;
          }
          if (rooms[i] === true) {
            bookedCount++;
          }
        }

        setAvailableRooms((prev) => {
          let new_state = prev;
          new_state[index] = availableCount;
          return new_state;
        });

        setBookedRooms((prev) => {
          let new_state = prev;
          new_state[index] = bookedCount;

          return new_state;
        });
      });
    }
  }, [guestHouses]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/approved/pending/length`)
      .then((res) => res.json())
      .then((data) => setPendingUser(data))
      .catch((err) => console.log(err.message));

    fetch(`${import.meta.env.VITE_API_URL}/booking/approved/pending`)
      .then((res) => res.json())
      .then((data) => setPendingBooking(data.length))
      .catch((err) => console.log(err.message));

    fetch(`${import.meta.env.VITE_API_URL}/users/approved/registered`)
      .then((res) => res.json())
      .then((data) => setRegisteredUsers(data.length))
      .catch((err) => console.log(err.message));

    fetch(`${import.meta.env.VITE_API_URL}/guestHouse`)
      .then((res) => res.json())
      .then((data) => {
        setGuestHouses(data);
        console.log(data);

        console.log(data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div className="maindash-wrapper">
      <div className=" MainDash">
        <div className="DashCard">
          <div className="DashIcon">
            <HomeIcon />
          </div>
          <div className="Dashtext">
            <h5 style = {{color : 'blue'}}>3</h5>
            <p >Total
            Guest Houses</p>
          </div>
        </div>
        <div className="DashCard">
          <div className="DashIcon">
            <PendingActionsIcon />
          </div>
          <div className="Dashtext">
            <h5 style = {{color : 'blue'}}>{pendingBooking}</h5>
           <Link to="/bookingapproval"><p>Pending
            Booking 
            Approvals</p></Link> 
          </div>
        </div>
        <div className="DashCard">
          <div className="DashIcon">
            <PendingActionsIcon />
          </div>
          <div className="Dashtext">
            <h5 style = {{color : 'blue'}}>{pendingUser}</h5>
           <Link to="/registrationapproval"><p>Pending
            Registration 
            Approvals</p></Link> 
          </div>
        </div>
        <div className="DashCard">
          <div className="DashIcon">
            <PersonIcon />
          </div>
          <div className="Dashtext">
            <h5 style = {{color : 'blue'}}>{registeredUsers}</h5>
          <Link to="/registeredusers"> <p>Registered
            Users</p></Link> 
          </div>
        </div>
      </div>
      <div className="DashBigCards d-flex">
        <div className="DashCard2">
          <div className="Dashtext2">
            <h3 >INSTITUTE GUEST HOUSE</h3>
            <p>Total Capacity : 10 <br />
            Available Rooms : {availableRooms[0]} <br />
           Booked Rooms</p>
            <div className="Dashcircle">
              <h2>{bookedRooms[0]}</h2>
            </div>
          </div>
        </div>
        <div className="DashCard2">
          <div className="Dashtext2">
            <h3>MEGA GUEST HOUSE</h3>
            <p>Total Capacity : 12 <br/>
           Available Rooms : {availableRooms[1]} <br/>
            Booked Rooms</p>
            <div className="Dashcircle">
              <h2>{bookedRooms[1]}</h2>
            </div>
          </div>
        </div>
        <div className="DashCard2">
          <div className="Dashtext2">
            <h3>SAC GUEST HOUSE</h3>
            <p>Total Capacity : 8 <br/>
           Available Rooms : {availableRooms[2]}<br/>
            Booked Rooms</p>
            <div className="Dashcircle">
              <h2>{bookedRooms[2]}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashInfo;
