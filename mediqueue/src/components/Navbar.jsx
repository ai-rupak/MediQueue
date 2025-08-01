import React, { useContext, useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)
    const { token, setToken, userData } = useContext(AppContext)
    const dropdownRef = useRef(null)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
        setShowProfileDropdown(false)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Close mobile menu when window is resized to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setShowMenu(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleProfileClick = () => {
        setShowProfileDropdown(!showProfileDropdown)
    }

    const handleMenuItemClick = () => {
        setShowMenu(false)
    }

    const handleProfileMenuClick = (path) => {
        navigate(path)
        setShowProfileDropdown(false)
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            {/* Logo */}
            <div onClick={() => navigate('/')} className='cursor-pointer'>
                <h1 className='text-2xl font-bold'>
                    Medi<span className='text-[#4bb3b8]'>Queue</span>+
                </h1>
            </div>

            {/* Desktop Navigation */}
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    {({ isActive }) => (
                        <>
                            <li className='py-1 hover:text-[#4bb3b8] transition-colors duration-300'>HOME</li>
                            <hr className={`border-none outline-none h-0.5 bg-[#4bb3b8] w-3/5 m-auto transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/doctors'>
                    {({ isActive }) => (
                        <>
                            <li className='py-1 hover:text-[#4bb3b8] transition-colors duration-300'>ALL DOCTORS</li>
                            <hr className={`border-none outline-none h-0.5 bg-[#4bb3b8] w-3/5 m-auto transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/about'>
                    {({ isActive }) => (
                        <>
                            <li className='py-1 hover:text-[#4bb3b8] transition-colors duration-300'>ABOUT</li>
                            <hr className={`border-none outline-none h-0.5 bg-[#4bb3b8] w-3/5 m-auto transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/contact'>
                    {({ isActive }) => (
                        <>
                            <li className='py-1 hover:text-[#4bb3b8] transition-colors duration-300'>CONTACT</li>
                            <hr className={`border-none outline-none h-0.5 bg-[#4bb3b8] w-3/5 m-auto transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                        </>
                    )}
                </NavLink>
            </ul>

            {/* Desktop Auth Section */}
            <div className='flex items-center gap-4'>
                {token && userData ? (
                    <div className='relative' ref={dropdownRef}>
                        <div 
                            onClick={handleProfileClick}
                            className='flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200'
                        >
                            <img 
                                className='w-8 h-8 rounded-full object-cover border-2 border-gray-200' 
                                src={userData.image || '/default-avatar.png'} 
                                alt="Profile" 
                            />
                            <img 
                                className={`w-2.5 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} 
                                src={assets.dropdown_icon} 
                                alt="Dropdown" 
                            />
                        </div>
                        
                        {/* Profile Dropdown */}
                        <div className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-30 transition-all duration-200 ${
                            showProfileDropdown ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform translate-y-2'
                        }`}>
                            <div className='py-2'>
                                <div className='px-4 py-2 border-b border-gray-100'>
                                    <p className='font-medium text-gray-800 truncate'>{userData.name || 'User'}</p>
                                    <p className='text-xs text-gray-500 truncate'>{userData.email || ''}</p>
                                </div>
                                <button 
                                    onClick={() => handleProfileMenuClick('/my-profile')}
                                    className='w-full text-left px-4 py-2 text-gray-600 hover:text-[#4bb3b8] hover:bg-gray-50 transition-colors duration-200'
                                >
                                    My Profile
                                </button>
                                <button 
                                    onClick={() => handleProfileMenuClick('/my-appointments')}
                                    className='w-full text-left px-4 py-2 text-gray-600 hover:text-[#4bb3b8] hover:bg-gray-50 transition-colors duration-200'
                                >
                                    My Appointments
                                </button>
                                <button 
                                    onClick={logout}
                                    className='w-full text-left px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 border-t border-gray-100'
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={() => navigate('/login')} 
                        className='bg-primary text-black px-8 py-3 rounded-full font-normal hidden md:block hover:opacity-80 transition-opacity duration-200'
                    >
                        SignUp
                    </button>
                )}

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setShowMenu(true)}
                    className='w-6 md:hidden hover:opacity-70 transition-opacity duration-200'
                    aria-label="Open menu"
                >
                    <img src={assets.menu_icon} alt="Menu" />
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
                    showMenu ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`} onClick={() => setShowMenu(false)} />

                {/* Mobile Menu */}
                <div className={`fixed right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-white z-50 transform transition-transform duration-300 md:hidden ${
                    showMenu ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    {/* Mobile Menu Header */}
                    <div className='flex items-center justify-between px-5 py-4 border-b border-gray-200'>
                        <h1 className='text-xl font-bold'>
                            Medi<span className='text-[#4bb3b8]'>Queue</span>+
                        </h1>
                        <button 
                            onClick={() => setShowMenu(false)}
                            className='w-6 hover:opacity-70 transition-opacity duration-200'
                            aria-label="Close menu"
                        >
                            <img src={assets.cross_icon} alt="Close" />
                        </button>
                    </div>

                    {/* Mobile Menu Content */}
                    <div className='flex flex-col h-screen'>
                        {/* Navigation Links */}
                        <ul className='flex flex-col gap-1 mt-3 px-5 text-base font-medium flex-shrink-0'>
                            <li>
                                <NavLink 
                                    onClick={handleMenuItemClick} 
                                    to='/' 
                                >
                                    {({ isActive }) => (
                                        <div className='relative'>
                                            <span className={`block px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                                                isActive ? 'text-[#4bb3b8]' : 'hover:bg-gray-100'
                                            }`}>
                                                HOME
                                            </span>
                                            {isActive && <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/5 h-0.5 bg-[#4bb3b8]'></div>}
                                        </div>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    onClick={handleMenuItemClick} 
                                    to='/doctors' 
                                >
                                    {({ isActive }) => (
                                        <div className='relative'>
                                            <span className={`block px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                                                isActive ? 'text-[#4bb3b8]' : 'hover:bg-gray-100'
                                            }`}>
                                                ALL DOCTORS
                                            </span>
                                            {isActive && <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/5 h-0.5 bg-[#4bb3b8]'></div>}
                                        </div>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    onClick={handleMenuItemClick} 
                                    to='/about' 
                                >
                                    {({ isActive }) => (
                                        <div className='relative'>
                                            <span className={`block px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                                                isActive ? 'text-[#4bb3b8]' : 'hover:bg-gray-100'
                                            }`}>
                                                ABOUT
                                            </span>
                                            {isActive && <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/5 h-0.5 bg-[#4bb3b8]'></div>}
                                        </div>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    onClick={handleMenuItemClick} 
                                    to='/contact' 
                                >
                                    {({ isActive }) => (
                                        <div className='relative'>
                                            <span className={`block px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                                                isActive ? 'text-[#4bb3b8]' : 'hover:bg-gray-100'
                                            }`}>
                                                CONTACT
                                            </span>
                                            {isActive && <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/5 h-0.5 bg-[#4bb3b8]'></div>}
                                        </div>
                                    )}
                                </NavLink>
                            </li>
                        </ul>

                        {/* Mobile Auth Section */}
                        <div className='mt-auto mb-20 p-5 border-t border-gray-200 bg-white flex-shrink-0'>
                            {token && userData ? (
                                <div className='space-y-3'>
                                    {/* User Info */}
                                    <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                                        <img 
                                            className='w-8 h-8 rounded-full object-cover border-2 border-gray-200' 
                                            src={userData.image || '/default-avatar.png'} 
                                            alt="Profile" 
                                        />
                                        <div className='flex-1 min-w-0'>
                                            <p className='font-medium text-gray-800 truncate text-sm'>{userData.name || 'User'}</p>
                                            <p className='text-xs text-gray-500 truncate'>{userData.email || ''}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Profile Actions */}
                                    <div className='space-y-1'>
                                        {/* <button 
                                            onClick={() => handleProfileMenuClick('/my-profile')}
                                            className='w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#4bb3b8] hover:bg-gray-100 rounded-lg transition-colors duration-200'
                                        >
                                            My Profile
                                        </button>
                                        <button 
                                            onClick={() => handleProfileMenuClick('/my-appointments')}
                                            className='w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#4bb3b8] hover:bg-gray-100 rounded-lg transition-colors duration-200'
                                        >
                                            My Appointments
                                        </button> */}
                                        <button 
                                            onClick={logout}
                                            className='w-full text-left px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200'
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => {
                                        navigate('/login')
                                        setShowMenu(false)
                                    }} 
                                    className='w-full bg-[#4bb3b8] text-white px-6 py-3 rounded-full font-medium hover:bg-[#3a9ca1] transition-colors duration-200 text-center'
                                >
                                    Sign Up / Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar