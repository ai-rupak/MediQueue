import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import toast from "react-hot-toast";
import { DoctorContext } from "../context/DoctorContext";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState("Admin");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const navigate = useNavigate();

  const {setAToken,backendUrl} = useContext(AdminContext)
  const {dToken,setDToken} = useContext(DoctorContext)
  const [loading, setLoading] = useState(false);


  const onSubmitHandler = async (event)=>{
    event.preventDefault();
    setLoading(true);
    try {
        if(state == 'Admin'){
            const {data} = await axios.post(`${backendUrl}/api/admin/login`,{email,password})
            if(data.success){
                localStorage.setItem('aToken',data.token)
                setAToken(data.token)
                navigate('/admin-dashboard')
                toast.success("Admin Login Succesful!")
            }
            else{
                toast.error(data.message)
            }
        } else{
          const {data} = await axios.post(`${backendUrl}/api/doctor/login`,{email,password})
          if(data.success){
                localStorage.setItem('dToken',data.token)
                console.log(data.token)
                setDToken(data.token)
                navigate('/doctor-dashboard')
                toast.success("Doctor Login Succesful!")
            }
            else{
                toast.error(data.message)
            }
        }
    } catch (error) {
        toast.error(error.message );
    }finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg ">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary"> {state} </span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required />
        </div>
        <button  disabled={loading} type="submit" className="bg-primary text-black w-full py-2 rounded-md text-base">{loading ? "Logging in..." : "Login"}</button>
        {
            state === 'Admin' 
            ?<p>Doctor Login? <span className="text-primary underline cursor-pointer" onClick={()=>setState('Doctor')}>Click here</span></p> 
            :<p>Admin Login? <span  className="text-primary underline cursor-pointer" onClick={()=>setState('Admin')}>Click here</span></p> 
        }
      </div>
    </form>
  );
};

export default Login;
