import React, { useState } from 'react';
import bgImage from '../assets/bg-signup.png';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axios';

const SignUp = () => {
    // State for storing form input values
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await axiosInstance.post('/auth/register', formData);

            console.log(formData)

            if (response.status === 200) {
                toast.success("Account created successfully!");
                navigate('/')
                // Optionally, redirect or reset the form
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error creating account");
        }
    };

    return (
        <section className='flex'>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Create your account
                    </h2>
                    <p className='text-center text-md text-gray-400'>Please enter your details to create your account</p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSignUp} className="space-y-3">
                        <div className='flex justify-between'>
                            <div>
                                <label htmlFor="fname" className="block text-sm/6 font-medium text-gray-900">
                                    First Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="fname"
                                        name="fname"
                                        type="text"
                                        placeholder='Enter first name'
                                        required
                                        value={formData.fname}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lname" className="block text-sm/6 font-medium text-gray-900">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="lname"
                                        name="lname"
                                        type="text"
                                        placeholder='Enter last name'
                                        required
                                        value={formData.lname}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder='Email Address'
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder='Enter password'
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    <p className="mt-5 text-center text-sm/6 text-gray-500">
                        Already have an account?{' '}
                        <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Log in
                        </Link>
                    </p>

                    <p className='text-center flex justify-center items-center text-gray-400 mt-4'><span>_____________ </span> or continue with<span>_____________ </span></p>
                    <div className='mt-5'>
                        <button
                            type="button"
                            className="flex w-full justify-center items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-sm/6 font-semibold text-gray-600 shadow-sm"
                        >
                            <FcGoogle size={22} /> Continue with Google
                        </button>
                    </div>
                </div>
            </div>
            <div className='bg-blue-700 h-[100vh] '>
                <img src={bgImage} alt='bg-image' className='h-auto w-auto flex justify-center items-center' />
            </div>
        </section>
    )
}

export default SignUp;
