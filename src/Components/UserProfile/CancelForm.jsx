import { useState, useEffect } from 'react';
const CancelForm = ({ bookingId: id, onDeleteSuccess}) => {
  const [bookingId, setBookingId] = useState('');
  const [bookingDetail, setBookingDetails] = useState();
  const guestHouses = ["INSTITUTE GUEST HOUSE", "MEGA GUEST HOUSE", "SAC GUEST HOUSE"];
  const guestHouseCost = [1000, 600, 600];
  useEffect(()=>{
    
    setBookingId(id);
  }, [])
  const [formData, setFormData] = useState({
    name: '',
    bankname : '',
    accountNumber: '',
    ifscCode: '',
  });
  
  const [form, setForm] = useState(true);
  const [result, setResult] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };
  // console.log('Boooking data', bookingDetails);
  // console.log("Booking ID: ", bookingId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm(false);
    try {
      // Make an HTTP POST request to save form data
    const response = await fetch(`${import.meta.env.VITE_API_URL}/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking:bookingId,
          name: formData.name,
          bankName: formData.bankname,
          accountNumber: formData.accountNumber,
          IFSC: formData.ifscCode,
        })
      });
      const data = await response.json();
      setBookingDetails(data);
      console.log("response : ", data); 
      
      if (!response.ok) {
        throw new Error('Failed to save form data');
      }

      // Update the result state with the saved data
      setResult({
        guestHouse: guestHouses[data?.guestHouse-1],
        name: data?.name,
        branch: data?.bankName,
        accountNumber: data?.accountNumber,
        ifscCode: data?.IFSC,
        // arrivalDate: arrivalDate.toDateString(),
        arrivalDate: data?.arrivalDate,
        cancellationDate: data?.cancellationDate,
        // cancellationDate: cancellationDate.toDateString(),
        numberOfDays: data?.noOfDays,
        amountDeducted: data?.amountDeducted,
        amountReturned: data?.amountReturned,
      });

      onDeleteSuccess();

    } catch (error) {
      console.error('Error saving form data:', error.message);
    }
  };
  return (
    <>
      {form && <div>
        <form onSubmit={handleSubmit}>
          <p style={{color:'red'}}>All the fields marked with (*) are mandatory.<br/>
            Please fill the following form for reimbursement of room charges. 
          </p>
          <div className="col-md-8">
            <label htmlFor="firstName" className="form-label">
              Name<span className="asterisk">*</span>
            </label>
            <input type="text" className="form-control" id="firstName" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="col-md-8">
            <label htmlFor="Bankname" className="form-label">
              Bank Name<span className="asterisk">*</span>
            </label>
            <input type="text" className="form-control" id="Bankname" name="bankname" value= {formData.bankname} onChange={handleInputChange} required />
          </div>
          <div className="col-md-8">
            <label htmlFor="accountNumber" className="form-label">
              Account Number<span className="asterisk">*</span>
            </label>
            <input type="text" className="form-control" id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} required />
          </div>
          <div className="col-md-8">
            <label htmlFor="IFSC" className="form-label">
              IFSC<span className="asterisk">*</span>
            </label>
            <input type="text" className="form-control" id="IFSC" name="ifscCode" value={formData.ifscCode} onChange={handleInputChange} required />
          </div>
          <br />
          <button type = "submit" className='btn btn-primary btn-sm'>Submit</button>
        </form>
      </div>}
      {result && (
        <div>
        <h2>Cancellation Details:</h2>
        <table>
          <tbody>

        <tr><td><strong>Name:</strong> {result.name}</td></tr>
        <tr><td><strong>Branch:</strong> {result.branch}</td>
        </tr>
        <tr><td><strong>Account Number:</strong> {result.accountNumber}</td></tr>
        <tr><td><strong>IFSC Code:</strong> {result.ifscCode}</td></tr>
        <tr><td><strong>Guest House:</strong> {result.guestHouse}</td></tr>
        <tr><td><strong>Arrival Date:</strong> {result.arrivalDate}</td></tr>
        <tr><td><strong>Cancellation Date:</strong> {result.cancellationDate}</td></tr>
        <tr><td><strong>Number of Days:</strong> {result.numberOfDays}</td></tr>
        <tr><td><strong>Amount Deducted:</strong> {result.amountDeducted}</td></tr>
        <tr><td><strong>Amount Returned:</strong> {result.amountReturned}</td></tr>
        <tr><td><strong>To find information about cancellation charges, please refer to the guidelines available on the homepage.</strong></td></tr>
        <tr><td><strong>Please navigate to your booking history in order to download the cancellation receipt.</strong></td></tr>
          </tbody>
        </table>
      </div>
      )}
    </>
  )
}
export default CancelForm;