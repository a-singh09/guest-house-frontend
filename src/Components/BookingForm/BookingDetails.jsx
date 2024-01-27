import React, { useState, useEffect, useContext } from "react";
import "./BookingDetails.css";
import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { FormContext } from "../ContextHooks/FormContext";

const inputStyle = {
  backgroundColor: "#f8f9fa",
  color: "black",
  fontWeight: 500,
};

const guestHouseOptions = [
  "Main Guest House",
  "SAC Guest House",
  "Mega Guest House",
];
const maxRooms = [2, 2, 2];

const BookingDetails = ({ setDateDetails }) => {
  // Get today's date in India's time zone.
  const todayInIndia = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  const todayDate = new Date(todayInIndia);
  const todayYear = todayDate.getFullYear();
  const todayMonth = String(todayDate.getMonth() + 1).padStart(2, "0");
  const todayDay = String(todayDate.getDate()).padStart(2, "0");
  const todayDateString = `${todayYear}-${todayMonth}-${todayDay}`;

  const [checkinDate, setCheckinDate] = useState(todayDateString);

  const { updateFormData } = useContext(FormContext);

  // Calculate tomorrow's date based on the selected check-in date.
  const tomorrowDate = new Date(todayDate);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowYear = tomorrowDate.getFullYear();
  const tomorrowMonth = String(tomorrowDate.getMonth() + 1).padStart(2, "0");
  const tomorrowDay = String(tomorrowDate.getDate()).padStart(2, "0");
  const tomorrowDateString = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;

  //adding limitation to the checkin and checkout date
  const maxAllowedCheckInDate = new Date(todayDate);
  maxAllowedCheckInDate.setDate(maxAllowedCheckInDate.getDate() + 21);
  const maxAllowedCheckoutDate = new Date(checkinDate);
  maxAllowedCheckoutDate.setDate(maxAllowedCheckoutDate.getDate() + 3);


  const [checkoutDate, setCheckoutDate] = useState(tomorrowDateString);

  const [durationOfStay, setDurationOfStay] = useState(1); // Default to 1 day.
  const [selectedGuestHouse, setSelectedGuestHouse] =
    useState("Main Guest House");
  const [roomsSelected, setRoomsSelected] = useState(1);

  useEffect(() => {
    // Calculate the duration of stay when either check-in or check-out date changes.
    const duration =
      (new Date(checkoutDate).getTime() - new Date(checkinDate).getTime()) /
      (1000 * 3600 * 24);
    setDurationOfStay(duration);
    setDateDetails({ startDate: checkinDate, endDate: checkoutDate });

    updateFormData("arrivalDate", checkinDate);
    updateFormData("departureDate", checkoutDate);
    updateFormData("roomsSelected", roomsSelected);
    const finalGuestHouse =
      selectedGuestHouse === "Main Guest House"
        ? 1
        : selectedGuestHouse === "SAC Guest House"
        ? 2
        : 3;
    updateFormData("guestHouseSelected", finalGuestHouse);
  }, [checkinDate, checkoutDate, selectedGuestHouse, roomsSelected]);

  const handleCheckinChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate < todayDateString) {
      alert("Check-in date cannot be earlier than today.");
    } else if(selectedDate > maxAllowedCheckInDate){
      alert("Check-in date cannot be later than 21 days.");
    } else {
      setCheckinDate(selectedDate);

      // Calculate tomorrow's date based on the selected check-in date and update check-out date.
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      const nextDayYear = nextDay.getFullYear();
      const nextDayMonth = String(nextDay.getMonth() + 1).padStart(2, "0");
      const nextDayDay = String(nextDay.getDate()).padStart(2, "0");
      const nextDayString = `${nextDayYear}-${nextDayMonth}-${nextDayDay}`;
      setCheckoutDate(nextDayString);
    }
  };

  const handleCheckoutChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate <= checkinDate) {
      alert(
        "Check-out date cannot be equal to or earlier than the check-in date."
      );
    } else if(selectedDate > maxAllowedCheckoutDate){
      alert("Maximum stay can be 3 days only !")
    } else {
      setCheckoutDate(selectedDate);
    }
  };

  const handleGuestHouseChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedGuestHouse(selectedOption);
    setRoomsSelected(1); // Reset the number of rooms selected when the guest house changes.
  };

  // Generate room options based on the selected guest house's maximum limit
  // Generate room options with a maximum limit of 3
const roomOptions = Array.from({ length: 3 }, (_, i) => i + 1);


const handleRoomsChange = (e) => {
  const selectedRooms = parseInt(e.target.value, 10);
  if (selectedRooms < 1) {
    alert("Minimum 1 room should be selected.");
  } else if (selectedRooms > 3) {
    alert("Maximum 3 rooms are allowed.");
  } else {
    setRoomsSelected(selectedRooms);
  }
};

  const handleReset = () => {
    setCheckinDate(todayDateString);
    setCheckoutDate(tomorrowDateString);
    setDurationOfStay(1);
    setSelectedGuestHouse("Main Guest House");
    setRoomsSelected(1);
  };

  return (
    <div className="navbar">
      {/* <button type="button" className="btn btn-lg back-button">
        <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
        <HomeRoundedIcon color="white" />
        </NavLink>
      </button> */}
      <div className="form-group">
        <label className="booking-label selectguesthouse" htmlFor="guestHouse">
          SELECT GUEST HOUSE
        </label>
        <select
          className="form-control inputs"
          style={inputStyle}
          id="guestHouse"
          value={selectedGuestHouse}
          onChange={handleGuestHouseChange}
        >
          {guestHouseOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="booking-label" htmlFor="checkin">
          CHECK IN :12:00 PM
        </label>
        {/* <input
          type="date"
          className="form-control inputs"
          style={inputStyle}
          id="checkin"
          placeholder="Check In"
          value={checkinDate}
          onChange={handleCheckinChange}
          min={todayDateString} // Set the minimum date to today
          max={maxAllowedCheckInDate.toISOString().split('T')[0]}
        /> */}
      </div>
      <div className="form-group">
        <label className="booking-label" htmlFor="checkout">
          CHECK OUT:11:00 am
        </label>
        {/* <input
          type="date"
          className="form-control inputs"
          style={inputStyle}
          id="checkout"
          placeholder="Check Out"
          value={checkoutDate}
          onChange={handleCheckoutChange}
          min={checkinDate} // Set the minimum date to the check-in date
          max={maxAllowedCheckoutDate.toISOString().split("T")[0]}
        /> */}
      </div>
      <div className="form-group">
        <label className="booking-label" htmlFor="stayduration">
          DURATION OF STAY
        </label>
        <input
          type="text"
          className="form-control inputs"
          style={inputStyle}
          id="stayduration"
          placeholder="Duration of Stay"
          value={`${durationOfStay} ${durationOfStay === 1 ? "day" : "days"}`}
          readOnly
        />
      </div>
      <div className="form-group">
        <label className="booking-label" htmlFor="rooms">
          NUMBER OF ROOMS
        </label>
        <select
          className="form-control inputs"
          style={inputStyle}
          id="rooms"
          value={roomsSelected}
          onChange={handleRoomsChange}
        >
          {roomOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}

        </select>
      </div>
      <button
        type="button"
        className="btn btn-sm changeSelection"
        onClick={handleReset}
      >
        CLEAR
      </button>
    </div>
  );
};

export default BookingDetails;