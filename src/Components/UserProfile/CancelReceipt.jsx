import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './cancelReceipt.css';
import { useUserContext } from '../ContextHooks/UserContext'; 
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CancelReceipt = ({bookingId}) => {
  const [invoiceData, setInvoiceData] = useState(null);
  const { userId } = useUserContext();

  useEffect(() => {
    if (userId) {
      fetch(`${import.meta.env.VITE_API_URL}/booking/${bookingId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched data new:', data);
          setInvoiceData(data);
        })
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      console.error('Invalid ObjectId:', userId);
    }
  }, [userId, bookingId]);

  const generatePDF = () => {
    if (!invoiceData) {
      console.error('No data to generate PDF');
      return;
    }
  
    const doc = new jsPDF();
    const startY = 20;
    const lineHeight = 10;
  
    // Define noOfDays function
    const noOfDays = (startDate, endDate) => {
      const startDateTime = new Date(startDate).getTime();
      const endDateTime = new Date(endDate).getTime();
      const differenceInMilliseconds = endDateTime - startDateTime;
      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
      return Math.round(differenceInDays);
    };
  
    doc.setFontSize(16);
    doc.text('NIT Jalandhar - Guest House', doc.internal.pageSize.width / 2, startY, { align: 'center' });
    doc.setFontSize(14);
    doc.text('Payment Receipt', doc.internal.pageSize.width / 2, startY + lineHeight, { align: 'center' });
    const details = [
      { label: 'Name:', value: invoiceData[0].roomBooker.name },
      { label: 'Guest House Name:', value: guestHouse[invoiceData[0].guestHouseSelected - 1] },
      { label: 'Phone Number:', value: invoiceData[0].roomBooker.phone },
      { label: 'Email:', value: invoiceData[0].roomBooker.email },
      { label: 'Date of Arrival:', value: new Date(invoiceData[0].startDate).toLocaleDateString() },
      { label: 'No of Days:', value: `${noOfDays(invoiceData[0].startDate, invoiceData[0].endDate)}` },
      { label: 'Cost of Each Room:', value: `${guestHouseCost[invoiceData[0].guestHouseSelected - 1]}` },
      { label: 'Total Rooms:', value: `${invoiceData[0].roomsSelected}` },
      { label: 'Payment Amount:', value: `${guestHouseCost[invoiceData[0].guestHouseSelected - 1] * invoiceData[0].roomsSelected * noOfDays(invoiceData[0].startDate, invoiceData[0].endDate)}` },
      { label: 'Deducted Amount:', value: `${guestHouseCost[invoiceData[0].guestHouseSelected - 1] * invoiceData[0].roomsSelected * noOfDays(invoiceData[0].startDate, invoiceData[0].endDate)*.25}` },
      { label: 'Returned Amount:', value: `${guestHouseCost[invoiceData[0].guestHouseSelected - 1] * invoiceData[0].roomsSelected * noOfDays(invoiceData[0].startDate, invoiceData[0].endDate)*.75}` },

    ];
  
    details.forEach((detail, index) => {
      doc.text(detail.label, 10, startY + (index + 3) * lineHeight);
      doc.text(detail.value, 60, startY + (index + 3) * lineHeight);
    });
  
    // Save the PDF
    doc.save('cancel booking receipt.pdf');
  };
   

  if (!invoiceData) {
    // Loading state, you can customize this part as per your needs
    return <p>Loading...</p>;
  }

  const guestHouse = ["Institute Guest House", "Mega Guest House", "SAC Guest House"];
  const guestHouseCost = [1000, 600, 600];

  return ( 
    <>
      <button onClick={generatePDF}>Download Receipt</button>
    </>
  );
};

export default CancelReceipt;

// import './cancelReceipt.css';
// import React, { useState, useEffect } from 'react';
// import { useUserContext } from '../ContextHooks/UserContext';
// import jsPDF from 'jspdf';
// import Logo from "../../images/logo_250.png.png";

// const CancelReceipt = ({ bookingId }) => {
//   const [invoiceData, setInvoiceData] = useState(null);
//   const { userId } = useUserContext();

//   useEffect(() => {
//     if (userId) {
//       fetch(`${import.meta.env.VITE_API_URL}/booking/${bookingId}`)
//         .then((response) => response.json())
//         .then((data) => {
//           console.log('Fetched data:', data);
//           setInvoiceData(data);
//         })
//         .catch((error) => console.error('Error fetching data:', error));
//     } else {
//       console.error('Invalid ObjectId:', userId);
//     }
//   }, [userId, bookingId]);
//   const noOfDays = (startDate, endDate) => {
//     const startDateTime = new Date(startDate).getTime();
//     const endDateTime = new Date(endDate).getTime();
//     const differenceInMilliseconds = endDateTime - startDateTime;
//     const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
//     return Math.round(differenceInDays);
//   };
//   const guestHouse = ["Institute Guest House", "Mega Guest House", "SAC Guest House"];
//   const guestHouseCost = [1000, 600, 600];

//   const handleDownloadInvoice = () => {
//     if (!invoiceData) return;

//     const pdf = new jsPDF();
//     const pdfContent = document.getElementById('pdf-content');
//     console.log('PDF Content:', pdfContent);
//     pdf.html(pdfContent, {
//       callback: () => {
//         pdf.save('invoice.pdf');
//         alert('Invoice downloaded!');
//       }
//     });
//   };

//   return (
//     <>
//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//         <button onClick={handleDownloadInvoice}>Download Invoice</button>
//       </div>
//       <div id="pdf-content" style={{ display: 'none' }}>
//         {invoiceData && invoiceData.length > 0 && (
//           <div className="invoice">
//             <section className="top">
//         <div className="my-company"> 
//           <img className="logo-icon" src={Logo} alt="NIT logo" />
//           <div className="text">
//             <h1 className="heading" style = {{color : 'black'}}>PAYMENT RECEIPT</h1>
//             <div className="wrap">
//               <div className="nitj">{`Dr. B.R. Ambedkar National Institute Of Jalandhar `}</div>
//               <div className="cnct">848172194 | Email</div>
//             </div>
//           </div>
//         </div>
//       </section>
//         {invoiceData && invoiceData.length > 0 && (
//       <section className="main">
//         <div className="dates-adresse-wrapper">
//           <div className="dates-adresse">
//             <div className="dates">
//               <div className="arrivehead">
//                 <div className="arrivaldate">Arrival Date</div>
//                 <div className="div1">{new Date(invoiceData[0].startDate).toLocaleDateString()}</div>
//               </div>
//               <div className="datehead">
//                 <div className="bookhead">Departure Date</div>
//                 <div className="div">{new Date(invoiceData[0].endDate).toLocaleDateString()}</div>
//               </div>
//               <div className="spce" />
//             </div>
//             <div className="userinfo">
//               <div className="adresse">
//                 <div className="userinfo1">{`Booked By: `}</div>
//                 <div className="name">{invoiceData[0].roomBooker.name}</div>
//                 <div className="wrap1">
//                   <div className="cntinfo">
//                     {invoiceData[0].roomBooker.phone| invoiceData[0].roomBooker.email}
//                   </div>
//                 </div>
//               </div>
//               <div className="guesthouse">
//                 <div className="guesthouse1">Guest House Name</div>
//                 <div className="housename">{guestHouse[invoiceData[0].guestHouseSelected - 1]}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="wrap2" />
//         <div className="main-inner">
//           <div className="frame-parent">
//             <div className="frame-group">
//               <div className="userinfo-parent">
//                 <div className="userinfo2">Number of Days :</div>
//                 <div className="name1">{noOfDays(invoiceData[0].startDate, invoiceData[0].endDate)}</div>
//               </div>
//               <div className="bookinfo">
//                 <div className="guesthouse2">Cost Of Each Room:</div>
//                 <div className="housename1">{guestHouseCost[invoiceData[0].guestHouseSelected - 1]}</div>
//               </div>
//             </div>
//             <div className="guesthouse-parent">
//               <div className="guesthouse3">{`Total Number Of Rooms :  `}</div>
//               <div className="housename2">{invoiceData[0].roomsSelected}</div>
//             </div>
//           </div>
//         </div>
        
//         <div className="frame-container">
//           <div className="frame-wrapper">
//             <div className="payment_amount">
//               <div className="total-ht">Payment Amount</div>
//               <div className="div2">{guestHouseCost[invoiceData[0].guestHouseSelected - 1] * invoiceData[0].roomsSelected * noOfDays(invoiceData[0].startDate, invoiceData[0].endDate)}</div>
//             </div>
//           </div>
//           <div className="frame-div">
//             <div className="deducted">
//               <div className="deducthead ">Deducted Amount</div>
//               <div className="div3">{guestHouseCost[invoiceData[0].guestHouseSelected - 1] * invoiceData[0].roomsSelected * noOfDays(invoiceData[0].startDate, invoiceData[0].endDate)*.25}</div>
//             </div>
//           </div>
//           <div className="frame-wrapper1">
//             <div className="return">
//               <div className="total-return">Returned Amount</div>
//               <div className="div4"><strong>{guestHouseCost[invoiceData[0].guestHouseSelected - 1] * invoiceData[0].roomsSelected * noOfDays(invoiceData[0].startDate, invoiceData[0].endDate)*.75}</strong></div>
//             </div>
//           </div>
//         </div>
//       </section>
//          )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CancelReceipt;
