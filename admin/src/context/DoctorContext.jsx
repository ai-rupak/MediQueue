import { useState } from "react"
import { createContext } from "react"
import axios from 'axios'
import toast from 'react-hot-toast'


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const [appointments , setAppointments] = useState([])
    const [dashData, setdashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken, setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):false)


    
    const getAppointments = async () => {
    try {
        console.log("Calling getAppointments()");
        const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: { dToken }
        });

        console.log("Response:", data);
        // await setAppointments(data.appointments);
        // toast.success("Every thing Fine")

    if (data.success && Array.isArray(data.appointments)) {
    const reversedAppointments = [...data.appointments].reverse();
    await setAppointments(reversedAppointments);
    console.log("Appointments set:", reversedAppointments);
    } else {
    console.error("Appointments data invalid:", data);
    toast.error(data.message || "Data not fetched");
    }

    } catch (error) {
        console.error(error.message);
        toast.error(error.message);
    }
    };

    const completeAppointment = async(appointmentId)=>{
        try {
            const {data} = await axios.post(`${backendUrl}/api/doctor/complete-appointment`,{appointmentId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    const cancelAppointment = async(appointmentId)=>{
        try {
            const {data} = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`,{appointmentId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }
    const getDashData = async()=>{
        try {
            const {data} = await axios.get(`${backendUrl}/api/doctor/dashboard`,{headers:{dToken}})

            if(data.success){
                setdashData(data.dashData)
                console.log(data.dashData)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    const getProfileData = async()=>{
        try {
            const {data} = await axios.get(`${backendUrl}/api/doctor/profile`,{headers:{dToken}})
            console.log(data)
            if(data.success){
                setProfileData(data.profileData)
                console.log(data.profileData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    



    const value = {
        dToken,setDToken,
        backendUrl,
        appointments,setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,getDashData,setdashData,
        getProfileData,profileData,setProfileData
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider