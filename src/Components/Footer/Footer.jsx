import React from 'react';
import './Footer.css'
import logo from '../../images/logo_250.png.png'

// import React from 'react';
// import './Footer.css'; // Import your CSS file
// import logo from '../src/logo_250.png'


const Footer = () => {
  return (
    <> <div className="foot" >
      <div className="left">
        <div>

          <div>
          <img
            style={{ width: '70px', height: '70px', marginRight: '15px', float: 'left' }}
             src={logo} alt="My Image" />
          
          <h4 style={{ paddingLeft: '5px', paddingRight: '10px',color:"white" }}>
            Dr B R Ambedkar National Institute of Technology Jalandhar
          </h4>

          </div>

          <div style={{marginTop:"5px",color:"white"}}>
          <p className="">
            <i className="material-icons"
           
             >
              place
            </i>
            G.T Road, Amritsar Bypass, Jalandhar, Punjab, India-144008
          </p>
          <p className="">
            <i className="material-icons"
           
             >
             local_phone  
            </i>
        + 91-0181 - 5037855, 2690301, 2690453, 3082000 </p>

        </div>
        </div>
        <div className="socialflex" style={{marginTop:"5px"}}>
          <i className="fa fa-facebook"></i>
          <i className="fa fa-twitter"></i>
          <i className="fa fa-linkedin"></i>
          <i className="fa fa-instagram"></i>
          <i className="fa fa-youtube-play"></i>
        </div>
      </div>
      <div className="right">
        <h4 style={{ marginLeft: '60px', display: 'block',textAlign:'center',color:"white" }}>Quick Links</h4>
        <div className="flex-container23">
          


          <div className='adiv'>
            <ul  className='list'>
                <li>
                  <a
                    href="https://www.nitj.ac.in/index.html"
                    target="_blank"
                    className="external-link"
                  >
                    Institute
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.nitj.ac.in/admissions/index.html#btech"
                    target="_blank"
                    className="external-link"
                  >
                    Admission
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/admin/ranking.html"
                    target="_blank"
                    className="external-link"
                  >
                    Rankings
                  </a>
                </li>
              </ul>
            </div>
            <div className='adiv'>
            <ul  className='list'>
                <li>
                  <a
                    href="https://www.nitj.ac.in/template/index.html?id=651e908479c68ff6aaa9df9e?category=newpage"
                    target="_blank"
                    className="external-link"
                  >
                    Annual Reports
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/template/index.html?id=64ae4b97a5e16718759c7e9c?category=newpage"
                    target="_blank"
                    className="external-link"
                  >
                    Rules/Policies
                  </a>
                </li>
                <li>
                  <a
                    href="https://nitj.ac.in/admin/administration.html"
                    target="_blank"
                    className="external-link"
                  >
                    Deans
                  </a>
                </li>
              </ul>
            </div>
            <div className='adiv'>
            <ul  className='list'>
                <li>
                  <a
                    href="https://www.nitj.ac.in/template/index.html?id=6551f252a7c0e1110f0f7882?category=newpage"
                    target="_blank"
                    className="external-link"
                  >
                    List of Holidays
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/nitj_files/links/Dr_21443.pdf"
                    target="_blank"
                    className="external-link"
                  >
                    NIRF 2023
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/admin/ranking.html"
                    target="_blank"
                    className="external-link"
                  >
                    Rankings
                  </a>
                </li>
              </ul>
            </div>
            <div className='adiv'>
            <ul  className='list'>
                <li>
                  <a
                    href="https://www.nitj.ac.in/NITJ-Compendium/"
                    target="_blank"
                    className="external-link"
                  >
                    NITJ Compendium
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/template/index.html?id=64faf68538ceda75f04478fe?category=newpage"
                    target="_blank"
                    className="external-link"
                  >
                    NIT Act
                  </a>
                </li>
                <li>
                  <a
                    href="https://nitj.ac.in/template/index.html?id=6433e06be7b7ce1ef620fd53?category=notice"
                    target="_blank"
                    className="external-link"
                  >
                    Academic Calendar
                  </a>
                </li>
              </ul>
            </div>

        </div>
       
      </div>
      
      </div>
      
   </>
  
  );
};



export default Footer;