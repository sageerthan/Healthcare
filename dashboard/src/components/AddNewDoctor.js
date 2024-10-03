import { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddNewDoctor = () => {

  const { token, setToken, url, isAuthenticated, setIsAuthenticated } = useContext(StoreContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNic] = useState("");
  const [doctorDepartment,setDoctorDepartment]=useState("");
  const [docAvatar,setDocAvatar]=useState("");
  const [docAvatarPreview,setDocAvatarPreview]=useState("");

  const departmentsArray=[
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
 ];

  const navigate = useNavigate();

  const handleAvatar = async(e)=>{
    const file=e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    }
  }

  const handleAddNewDoctor = async (e) => {
     e.preventDefault();
     try{
      const formData=new FormData();
      formData.append("firstName",firstName);
      formData.append("lastName",lastName);
      formData.append("email",email);
      formData.append("password",password);
      formData.append("phone",phone);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      
      const response = await axios.post(`${url}/api/v1/user/doctor/addnew`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      toast.success(response.data.message);
      navigate("/");
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="page">
        <div className="container form-component add-doctor-form">
          <img src="/logo.png" alt="logo" className="logo"/>
          <h2 className="form-title">Register a New Doctor</h2>
      
          <form onSubmit={handleAddNewDoctor}>
            <div className="first-wrapper">
               <div>
                  <img src={docAvatarPreview ? `${docAvatarPreview}`: "/docHolder.jpg"} alt="Doctor Avatar"/>
                  <input type="file" onChange={handleAvatar}/>
               </div>
            </div>
            <div>
              <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
              <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="number" placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <input type="number" placeholder='NIC' value={nic} onChange={(e) => setNic(e.target.value)} />
              <input type="date" placeholder='DOB' value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>
            <div>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <select value={doctorDepartment} onChange={(e)=>setDoctorDepartment(e.target.value)}>
                <option value="">Select Department</option>
                 {
                   departmentsArray.map((element,index)=>{
                     return(
                        <option value={element} key={index}>{element}</option>
                     )
                   })
                 }
              </select>
            </div>

            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <button type="submit">Add New Doctor</button>
            </div>
          </form>
        </div>


      </section>
    </>
  )
}

export default AddNewDoctor