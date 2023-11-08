import React from 'react'; 
import '../../style/userprofile.css';
import {useState} from 'react';
const PersonalDetail = () => {
    const [profilePhoto, setProfilePhoto] = useState('profile-default.jpg');
    const [newPhoto, setNewPhoto] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setNewPhoto(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };

  const handleUpdatePhoto = () => {
    if (newPhoto) {
      setProfilePhoto(newPhoto);
      setModalOpen(false);
    }
  };
    const [StudentData, setStudentData] = useState({
        name: 'Student Name',  
        rollNumber : '2110423',
        branch :'CSE',
        ContactNumber2: '123-456-7890', 
        email: 'student@gmail.com'
    }); 
    
    const { name, ContactNumber2, rollNumber, email, branch } = StudentData;
      // image pop up
      const [dialog, setDialog] = useState(false);
      const toggleDialog = () => {
        setDialog(!dialog);
      };
  return (
    <div className='container-fluid'>
        <div className = 'row'>
            <div className = 'col-4'>
                <div className = 'row user-image'>
                    <img  style={{ width: "500%", height: "600%" }}src='./p.jpg' alt="" />
                    <span
                     style={{ cursor: 'pointer', marginLeft: '10px' }}
                    onClick={() => setModalOpen(true)}>
                    📷
                </span>
                </div> 
                {isModalOpen && (
                <div className="modal">
                <div className="modal-content">
                    <img src={newPhoto} alt="New Profile" />
                    <input type="file" accept="image/*" onChange={handlePhotoChange} />
                    <button onClick={handleUpdatePhoto}>Save</button>
                </div>
                </div>
            )}
            </div>
            <div className = 'col-8'>
                <div>
                    <h2>Personal Details</h2>
                    <div className = 'row mx-4'style = {{borderBottom: '1px solid #ccc'}}>
                        <div className='col-6'> <strong>Name</strong></div>
                        <div className='col-6'> <strong>"User Name"</strong></div>
                    </div>
                    <div className = 'row mx-4'style = {{borderBottom: '1px solid #ccc'}}>
                        <div className='col-6'> Email</div>
                        <div className='col-6'> abc@gmail.com</div>
                    </div>
                    <div className = 'row mx-4' style = {{borderBottom: '1px solid #ccc'}}>
                        <div className='col-6'> Contact Number</div>
                        <div className='col-6'> 5435465745</div>
                    </div>
                    <div className = 'row mx-4' style = {{borderBottom: '1px solid #ccc'}}>
                        <div className='col-6'> Address</div>
                        <div className='col-6'> NIT_JALANDHAR</div>
                    </div>
                    <div className = 'row mx-4'style = {{borderBottom: '1px solid #ccc'}}>
                        <div className='col-6'> Govt approved proof attached</div>
                        <div className = 'col-6'>

                        <button className="popup-button" onClick={toggleDialog}>View</button>
                        {dialog && (
                            <div className="dialog">
                            <div className="dialog-content">
                                <button className="close-icon" onClick={toggleDialog}>&#10005;</button>
                                <img className="popup-image" src='./Logo_of_NIT_Jalandhar.png' alt="Popup Image" />
                            </div>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
                <div className = 'my-4'>
                    <h2>Reference Details (for Student)</h2>
                    <div className = 'row mx-4 ' style = {{borderBottom: '1px solid #ccc'}}>
                        <div className='col-6'> Name</div>
                        <div className='col-6'> {name}</div>
                    </div>
                    <div className = 'row mx-4'style = {{borderBottom: '1px solid #ccc'}}>
                        <div className='col-6'> Roll Number</div>
                        <div className='col-6'> {rollNumber}</div>
                    </div>
                    <div className = 'row mx-4'style = {{borderBottom: '1px solid #ccc'}}>
                        <div className='col-6'> Contact Number</div>
                        <div className='col-6'> {ContactNumber2}</div>
                    </div>
                    <div className = 'row mx-4'style = {{borderBottom: '1px solid #ccc'}}>
                        <div className='col-6'> Branch</div>
                        <div className='col-6'> {branch}</div>
                    </div>
                    <div className = 'row mx-4'style = {{borderBottom: '1px solid #ccc'}}>
                        <div className='col-6'> Email</div>
                        <div className='col-6'> {email}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PersonalDetail;
