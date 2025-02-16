import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const {userData,setUserData,token,backendUrl,loadUserProfileData} = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image,setImage] = useState(false)

  const updateUserProfileData = async ()=>{

  }

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {
        isEdit
        ? <label htmlFor="image">
          <div className='inline-block relative cursor-pointer '>
            <img className='w-36 rounded opacity-50' src={image? URL.createObjectURL(image):userData.image} alt="" />
            <img className='w-10 absolute bottom-12 bg-slate-500 right-12' src={image?'':assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden/>
        </label>
        :      <img className='w-36 rounded-full' src={userData.image} alt="" />

      }
      {
        isEdit 
        ? <input className='bg-gray-100 text-3xl font-medium max-w-60 mt-4   px-2 ' type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))}/>
        : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id: </p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
        isEdit 
        ? <input type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))}/>
        : <p>{userData.phone}</p>
        } 
        <p>Address:</p>
        {
        isEdit 
        ? <p>
            <input value={userData.address.line1} onChange={(e)=> setUserData(prev => ({...prev,address,line1:e.target.value}))} type="text" />
            <br />
            <input value={userData.address.line2} onChange={(e)=> setUserData(prev => ({...prev,address,line2:e.target.value}))} type="text" />
          </p>

        : <p>{userData.address.line1} <br />{userData.address.line2}</p>
        }

        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3 '>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
        isEdit 
        ? <select className='max-w-20 bg-gray-100' onChange={(e)=> setUserData(prev =>({...prev,gender:e.target.value}))} value={userData.gender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        : <p className='text-gray-400'>{userData.gender}</p>
        }
        <p className='font-medium'>Birthday:</p>
        {
          isEdit 
          ? <input className='max-w-28 bg-gray-100' type="date" value={userData.dob} onChange={(e)=> setUserData(prev =>({...prev,gender:e.target.value}))}/>
          : <p className='text-gray-400'>{userData.dob}</p>
        }
        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit 
          ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={updateUserProfileData}>Save information</button>
          : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile