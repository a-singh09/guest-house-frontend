import React, { useState, useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import{useLocation} from 'react-router-dom';
import LogoImage from "../../images/logo_250.png.png"


 const columns = [
  { id: "BOOKING_ID", label: "Booking ID", minWidth: 50 },
  { id: "NAME", label: "Name", minWidth: 150 },
  { id: "ROOMNO", label: "Room Number", minWidth: 100 },
  { id: "DESIGNATION", label: "Designation", minWidth: 150 },
  { id: "GUESTHOUSE", label: "Guest House", minWidth: 170 },
  { id: "PHONENUMBER", label: "Phone Number", minWidth: 150 },
  { id: "EMAIL", label: "Email", minWidth: 150 },
  { id: "DATEOFARRIVAL", label: "Date of Arrival", minWidth: 190 },
  { id: "NOOFDAYS", label: "Number of Days", minWidth: 130 },
];
function noDays(startDate, endDate) {
  const startDateTime = startDate.getTime();
  const endDateTime = endDate.getTime();
  const differenceInMilliseconds = endDateTime - startDateTime;
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  return Math.round(differenceInDays);
}
const guestHouse = [' ','Institute Guest House', 'Mega Guest House', 'SAC Guest House']
function createData(data) {
  return {
    BOOKING_ID: data._id,
    NAME: data.name,
    ROOMNO: data.roomsSelected,
    DESIGNATION: data.designation,
    GUESTHOUSE: guestHouse[data.guestHouseAllotted],
    PHONENUMBER: data.phone,
    EMAIL: data.email,
    DATEOFARRIVAL: data.startDate,
    NOOFDAYS: noDays(new Date(data.startDate), new Date(data.endDate)),
  };
}

const UpcomingBookingTable = () => {
  const location=useLocation();
 
  console.log(location.state.fromDate);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const tableRef = useRef(null);


  const handleDownloadPDF = (startDate, endDate) => {
    const pdf = new jsPDF("p", "mm", "a4");
    let yPos = 10;
  
    // Add logo
    const logoImg = new Image();
    logoImg.src =LogoImage; // Replace with the path to your logo image
    const logoWidth = 20; // Adjust the width of the logo as needed
    const logoHeight = logoWidth * (logoImg.height / logoImg.width);
    pdf.addImage(logoImg, 'PNG', 10, yPos, logoWidth, logoHeight);
  
    // Add 'NIT JALANDHAR' text
    const nitTextXPos = 10 + logoWidth + 5; // Adjust the position as needed
    const nitTextYPos = yPos + (logoHeight / 2) + 5; // Adjust the position as needed
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text("NIT JALANDHAR", nitTextXPos, nitTextYPos);
  
    // Add dynamic header text
    yPos += logoHeight + 10;
    const dynamicHeaderText = `Guest House Booking statement from ${12} May to ${29}May`;
    const dynamicHeaderTextWidth = pdf.getStringUnitWidth(dynamicHeaderText) * 12 / pdf.internal.scaleFactor;
    const dynamicHeaderXPos = (pdf.internal.pageSize.getWidth() - dynamicHeaderTextWidth) / 2;
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text(dynamicHeaderText, dynamicHeaderXPos, yPos);
    yPos += 10;
  
    // Add 'Past Booking' header text below the dynamic header
    const pastBookingTextWidth = pdf.getStringUnitWidth("Completed Booking") * 10 / pdf.internal.scaleFactor;
    const pastBookingXPos = (pdf.internal.pageSize.getWidth() - pastBookingTextWidth) / 2;
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text("Completed Booking", pastBookingXPos, yPos);
    yPos += 10;
  
    // Add table header
    const headers = columns.map(column => column.label);
    const rowsData = rows.map(row => columns.map(column => row[column.id]));
  
    pdf.autoTable({
      startY: yPos,
      head: [headers],
      body: rowsData,
      theme: 'striped',
      styles: {
        font: 'helvetica',
        fontSize: 10,
        overflow: 'linebreak',
        cellPadding: 2,
        halign: 'center',
      },
      columnStyles: {
        0: { cellWidth: 15 }, // Adjust column width as needed
        1: { cellWidth: 15 },
        2: { cellWidth: 15 },
        4: { cellWidth: 15 },
        5: { cellWidth: 15 },
        6: { cellWidth: 15 },
        7: { cellWidth: 15 },
        8: { cellWidth: 15 },
        9: { cellWidth: 15 },
        // Add more column styles as needed
      },
    });
  
    pdf.save("table.pdf");
  };
  
  
  

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch(`${import.meta.env.VITE_API_URL}/booking/approved/upcoming`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an array of objects
        const formattedData = data.map(createData);
        setRows(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <h1 style={{ color: "black", fontWeight: 550 }}>PAST BOOKINGS</h1>
      <TableContainer sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
        <Table stickyHeader aria-label="sticky table" ref={tableRef}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#0275d8",
                    fontWeight: 600,
                    color: "white",
                    fontSize: "1.2rem",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "DATEOFARRIVAL"
                            ? new Date(value).toLocaleDateString()
                            : column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{
          fontWeight: 600,
        }}
      />
      <button style = {{backgroundColor : '#0275d8', color : 'white', margin : '0px 0px 10px 30px', padding : '5px', border : 'None'}} onClick={handleDownloadPDF}>Download PDF</button>
    </Paper>
    
  );
};

export default UpcomingBookingTable;
