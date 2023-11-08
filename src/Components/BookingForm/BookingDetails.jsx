import React, { useState, useEffect } from "react";
import "./BookingDetails.css";
import BookingComponent1 from "../BOOKING1/BookingComponent1";
import { NavLink } from "react-router-dom";

const inputStyle = {
  backgroundColor: "#f8f9fa",
  color: "black",
  fontWeight: 500,
};

const guestHouseOptions = ["Guest House 1", "Guest House 2", "Guest House 3"];
const maxRooms = [10, 8, 12];

const BookingDetails = ({setDateDetails}) => {
  // Get today's date in India's time zone.
  const todayInIndia = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const todayDate = new Date(todayInIndia);
  const todayDateString = todayDate.toISOString().slice(0, 10);

  const [checkinDate, setCheckinDate] = useState(todayDateString);

  // Calculate tomorrow's date based on the selected check-in date.
  const tomorrowDate = new Date(todayDate);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowDateString = tomorrowDate.toISOString().slice(0, 10);

  const [checkoutDate, setCheckoutDate] = useState(tomorrowDateString);

  const [durationOfStay, setDurationOfStay] = useState(1); // Default to 1 day.
  const [selectedGuestHouse, setSelectedGuestHouse] = useState("Guest House 1");
  const [roomsSelected, setRoomsSelected] = useState(1);

  useEffect(() => {
    // Calculate the duration of stay when either check-in or check-out date changes.
    const duration = (new Date(checkoutDate).getTime() - new Date(checkinDate).getTime()) / (1000 * 3600 * 24);
    setDurationOfStay(duration);
    setDateDetails({startDate: checkinDate, endDate: checkoutDate});

  }, [checkinDate, checkoutDate]);

  const handleCheckinChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate < todayDate) {
      alert("Check-in date cannot be earlier than today.");
    } else {
      setCheckinDate(selectedDate.toISOString().slice(0, 10));

      // Calculate tomorrow's date based on the selected check-in date and update check-out date.
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckoutDate(nextDay.toISOString().slice(0, 10));
    }
  };

  const handleCheckoutChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate <= new Date(checkinDate)) {
      alert("Check-out date cannot be equal to or earlier than the check-in date.");
    } else {
      setCheckoutDate(selectedDate.toISOString().slice(0, 10));
    }
  };

  const handleGuestHouseChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedGuestHouse(selectedOption);
    // Reset the number of rooms selected when the guest house changes.
    setRoomsSelected(1);
  };

  const handleRoomsChange = (e) => {
    const selectedRooms = parseInt(e.target.value, 10);
    if (selectedRooms < 1) {
      alert("Minimum 1 room should be selected.");
    } else if (selectedRooms > maxRooms[guestHouseOptions.indexOf(selectedGuestHouse)]) {
      alert(`Maximum ${maxRooms[guestHouseOptions.indexOf(selectedGuestHouse)]} rooms are allowed for this guest house.`);
    } else {
      setRoomsSelected(selectedRooms);
    }
  };

  const handleReset = () => {
    setCheckinDate(todayDateString);
    setCheckoutDate(tomorrowDateString);
    setDurationOfStay(1);
    setSelectedGuestHouse("");
    setRoomsSelected(1);
  };

  return (
    <div className="navbar">
      <button type="button" className="btn btn-lg back-button">
        <NavLink to="/" style={{textDecoration:'none', color: "white"}}>
        BACK
        </NavLink>
      </button>
      <div className="form-group">
        <label className="booking-label" htmlFor="checkin">
          CHECK IN
        </label>
        <input
          type="date"
          className="form-control inputs"
          style={inputStyle}
          id="checkin"
          placeholder="Check In"
          value={checkinDate}
          onChange={handleCheckinChange}
          min={todayDateString} // Set the minimum date to today
        />
      </div>
      <div className="form-group">
        <label className="booking-label" htmlFor="checkout">
          CHECK OUT
        </label>
        <input
          type="date"
          className="form-control inputs"
          style={inputStyle}
          id="checkout"
          placeholder="Check Out"
          value={checkoutDate}
          onChange={handleCheckoutChange}
          min={checkinDate} // Set the minimum date to the check-in date
        />
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
          value={`${durationOfStay} days`}
          readOnly
        />
      </div>
      <div className="form-group">
        <label className ="booking-label" htmlFor="guestHouse">
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
        <label className="booking-label" htmlFor="rooms">
          NUMBER OF ROOMS
        </label>
        <input
          type="number"
          className="form-control inputs"
          style={inputStyle}
          id="rooms"
          placeholder="Rooms Selected"
          value={roomsSelected}
          onChange={handleRoomsChange}
        />
      </div>
      <button type="button" className="btn  btn-sm changeSelection" onClick={handleReset}>
        CLEAR
      </button>
    </div>
  );
};

export default BookingDetails;
