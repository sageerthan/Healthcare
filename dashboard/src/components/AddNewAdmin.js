import { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddNewAdmin = () => {

  const { token, setToken, url} = useContext(StoreContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNic] = useState("");

  const navigate = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/v1/user/admin/addnew`,
        { firstName, lastName, email, password, phone, dob, gender, nic },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });
      toast.success(response.data.message);
      navigate("/")
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
        <div className="container form-component add-admin-form">
          <img src="/logo.png" alt="logo" className="logo"/>
          <h2 className="form-title">Add New Admin</h2>
      
          <form onSubmit={handleAddNewAdmin}>
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

            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <button type="submit">Add New Admin</button>
            </div>
          </form>
        </div>


      </section>
    </>
  )
}

export default AddNewAdmin