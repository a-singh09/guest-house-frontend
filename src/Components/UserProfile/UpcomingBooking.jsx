import React, { useState, useEffect } from "react";
import { useUserContext } from "../ContextHooks/UserContext";
import CancelPopUp from "./CancelPopUp";
import CancelForm from "./CancelForm";
import { Link } from "react-router-dom";
import sucessIcon from "../../images/check2.png";
import TestGate from "../Receipt/TestGate";
import './upcomingBooking.css';
const UpcomingBooking = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPaidPopup, setShowPaidPopup] = useState(false);

  const [bookingId, setBookingId] = useState("");
  const { userId } = useUserContext();
  const [bookings, setBookings] = useState([]);
  const [paymentStatus, setPaymentStatus] =  useState([]);
  const [hasShownApprovalAlert, setHasShownApprovalAlert] = useState(false);
  useEffect(() => { 
    fetch(
      `${import.meta.env.VITE_API_URL}/users/${userId}/bookingHistory/upcoming`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("upcoming booking data : ",data);
        setBookings(data); // Update the state with fetched data
      })
      .catch((err) =>
        console.log(
          "Error while retrieving booking data of user :",
          err.message
        )
      );
  }, [userId, bookings]);
  useEffect(() => {
    // Check if any booking has been approved
    const hasApprovedBooking = bookings.some(booking => booking.status === "approved");

    // If there is an approved booking and the alert hasn't been shown yet, show the alert
    if (hasApprovedBooking && !hasShownApprovalAlert) {
      alert('Your booking has been approved. Kindly complete the payment within 24 hours, otherwise, the booking will be automatically canceled.');
      setHasShownApprovalAlert(true); // Update state to indicate that the alert has been shown
    }
  }, [bookings, hasShownApprovalAlert]);
  function formatDateToISO(input_date) {
    let date = new Date(input_date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const formatRoomData = (room) => {
    // console.log("room: ", room)
    let str = "Room No. ";
    if (room.length == 1) {
      return `Room No. ${room[0]}`;
    }
    for (let i = 0; i < room.length - 1; i++) {
      str += `${room[i]}, `;
    }

    str += ` ${room[room.length - 1]}`;
    return str;
  };

  const handlePayment = () => {
    
  };

  const handleCancel = (id, status) => {
    console.log("booking id : ", id);
    console.log("booking status : ", status);
    setBookingId(id);
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      if (status == "approved" || status == "pending") {
        // if( status == 'pending') {
        handleBookingDeletion(id);
      } else {
        setShowPopup(true);
      }
    }
  };

  const handleBookingDeletion = (id) => {
    // API for cancelling booking
    fetch(`${import.meta.env.VITE_API_URL}/booking/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Booking cancelled:", data);

        // If the booking deletion is successful, update the state
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== id)
        );
      })
      .catch((err) => {
        alert("Due to some internal error your booking cannot be cancelled at the moment.Try again later!")
        console.log(
          "Error while cancelling booking from database :",
          err.message
        )
      }
      );
  };

  return (
    <>
      {bookings.length > 0 ? (
        <div>
          <div className="row" style={{ padding: "3%" }}>
            <h2 style={{ color: "#0275d8", backgroundColor: "#d8f4ff",padding: '8px', display: 'flex', justifyContent : 'center' }}>
              Upcoming Booking
            </h2>
          </div>
          <table className="tables-data" style = {{marginLeft : '12px', marginRight : '12px'}}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Alloted Room(s)</th>
                <th>Guest House</th>
                <th>Booking Date</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
                <th>Payment Status</th>
                <th>Cancel Booking</th>
                <th>Payment </th>
              </tr>
            </thead>
            <tbody>
              {bookings !== null &&
                bookings.length > 0 &&
                bookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <td>{index + 1}</td>
                    <td>
                      {(booking.status === "approved" || booking.status === 'paid' || booking.status === 'PAYMENT SUCCESS')
                        ? formatRoomData(booking.roomsAllotted)
                        : "NOT ALLOTTED"}
                    </td>
                    <td>
                      {(booking.status === "approved"|| booking.status === 'paid' || booking.status === 'PAYMENT SUCCESS')
                        ? booking.guestHouseSelected === 1
                          ? "INSTITUTE GUEST HOUSE"
                          : booking.guestHouseSelected === 2
                            ? "MEGA GUEST HOUSE"
                            : "SAC GUEST HOUSE"
                        : "NOT ALLOTTED"}
                    </td>
                    <td>{formatDateToISO(booking.createdAt)}</td>
                    <td>{formatDateToISO(booking.startDate)}</td>
                    <td>{formatDateToISO(booking.endDate)}</td>
                    <td>{booking.status}</td> 
                    <td>{booking.paymentStatus}</td>
                    {booking.status !== "cancelled"  && (
                      <td>
                        {" "}
                        <button
                          className="btn"
                          style={{ backgroundColor: "red", color: "white" }}
                          onClick={() =>
                            handleCancel(booking._id, booking.status)
                          }
                        >
                          Cancel
                        </button>
                      </td>
                     )} 
                    {booking.status === "cancelled" && (
                      <td>
                        {" "}
                        <button
                          className="btn"
                          style={{ backgroundColor: "red", color: "white" }}
                          onClick={() =>
                            handleCancel(booking._id, booking.status)
                          }
                          disabled
                        >
                          Cancel
                        </button>
                      </td>
                    )}
                    {/* { && (
                      <td>
                        {" "}
                        <button
                          className="btn"
                          style={{ backgroundColor: "red", color: "white" }}
                          onClick={() =>
                            handleCancel(booking._id, booking.status)
                          }
                        >
                          Cancel
                        </button>
                      </td>
                    )} */}
{/* 
                    { && (
                      <td>
                        {" "}
                        <button
                          className="btn"
                          style={{ backgroundColor: "red", color: "white" }}
                          onClick={() =>
                            handleCancel(booking._id, booking.status)
                          }
                        >
                          Cancel
                        </button>
                      </td>
                    )} */}
                    {booking.status !== "approved" &&(
                      <td>
                        <button
                          className="btn"
                          style={{ backgroundColor: "red", color: "white" }}
                          onClick={() => setShowPaidPopup(true)}
                          disabled
                        >
                          Pay Now
                        </button>
                      </td>
                    )}
                    {(booking.paymentStatus === 'SUCCESS' &&  booking.status === "approved")&& (
                      <td>
                        <button
                          className="btn"
                          style={{ backgroundColor: "red", color: "white" }}
                          onClick={() => setShowPaidPopup(true)}
                        >
                          Pay Now
                        </button>
                      </td>
                    )}

                    {(booking.paymentStatus !== 'SUCCESS' && booking.status === "approved") && (
                      <td>
                        <button className="btn" style = {{ backgroundColor: "green", color: "white", border : 'none'}}>
                          <a 
                            href = {`${import.meta.env.VITE_API_URL}/payments/makepayment?booking_id=${booking._id}`}
                            style={{width : '100%', height : '100%', backgroundColor: "green", color: "white"}}
                          >
                            Pay Now
                          </a>
                        </button>
                        
                      </td>
                    )}

                    {booking.status === "pending" && (
                      <td>
                        {" "}
                        <button
                          className="btn"
                          style={{ backgroundColor: "green", color: "white" }}
                          disabled
                        >
                          Pay Now
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontSize: "50px",
              color: "#0275d8",
              backgroundColor: "#d8f4ff",
            }}
          >
            No Upcoming Bookings
          </h2>
          {/* <p>You currently have no upcoming bookings.</p> */}
        </div>
      )}

      {showPaidPopup && (
        <div className="popup-overlay-booking">
          <div className="popup-booking" onClick={() => setShowPaidPopup(false)}>
            <img className="sucessIcon-booking" src={sucessIcon} alt="Success Icon" />

            <p className="popup-para-booking">Payment is already done..</p>
            <button className="btn btn-primary btn-sm popupClose-booking" onClick={() => setShowPaidPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      {showPopup && (
        <CancelPopUp isOpen={showPopup} closePopup={() => setShowPopup(false)}>
          <CancelForm
            bookingId={bookingId}
            onDeleteSuccess={() => handleBookingDeletion(bookingId)}
          />
        </CancelPopUp>
      )}
    </>
  );
};

export default UpcomingBooking;
