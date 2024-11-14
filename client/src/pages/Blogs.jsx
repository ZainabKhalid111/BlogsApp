import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import axiosInstance from '../utils/axios';
import toast from 'react-hot-toast';
import blogImg from '../assets/bg-signup.png';
import { BsThreeDotsVertical } from "react-icons/bs";

const Blogs = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: '',
        author: '',
        imageUrl: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [getBlogsData, setGetBlogsData] = useState([]);
    const [useUrl, setUseUrl] = useState(true);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [activeBlogId, setActiveBlogId] = useState(null);
    const [editBlog, setEditBlog] = useState(false);

    const token = localStorage.getItem('authToken')

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setFormData((prevData) => ({
            ...prevData,
            imageUrl: '' // Clear imageUrl if a file is uploaded
        }));
    };

    const handleAddBlog = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/blogs/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(formData)

            if (response.status === 200) {
                toast.success("Blog created successfully!");
                getBlogs();
                setFormData({})
                setShowModal(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error creating blog post");
        }
    };

    const getBlogs = async () => {
        try {
            const response = await axiosInstance.get('/blogs/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response)

            if (response.status === 200) {
                setGetBlogsData(response.data)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error while getting blogs");
        }
    }

    useEffect(() => {
        getBlogs()
    }, [])


    const handleDeleteBlog = async () => {
        try {
            const response = await axiosInstance.delete(`/blogs/delete/${activeBlogId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response)

            if (response.status === 200) {
                getBlogs();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error while getting blogs");
        }
    }

    const handleEditBlog = async () => {
        setShowModal(true)
        setEditBlog(true)
        const blogToEdit = getBlogsData.find((blog) => blog._id === activeBlogId);
        if (blogToEdit) {
            setFormData({
                title: blogToEdit.title,
                content: blogToEdit.content,
                tags: blogToEdit.tags,
                author: blogToEdit.author,
                imageUrl: blogToEdit.imageUrl || ''  // Set a default if needed
            });
        }
        setActiveBlogId(null)
    }

    const handleUpdateBlog = async () => {
        try {
            const response = await axiosInstance.post(`/blogs/update/${activeBlogId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response)

            if (response.status === 200) {
                // setGetBlogsData(response.data)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error while getting blogs");
        }
    }

    console.log(formData);

    return (
        <section className='bg-gray-300 h-[100vh] py-10 overflow-y-auto'>
            <div className='mx-10'>
                <div className='w-full flex justify-end py-2'>
                    <button
                        className='px-4 py-2 bg-[#6366F1] rounded-lg text-white'
                        onClick={() => setShowModal(true)}
                    >
                        Add new blog
                    </button>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center '>
                    {getBlogsData?.length > 0 ? (
                        getBlogsData.map((blog) => (
                            <div className='p-5 bg-white rounded-md w-full  relative cursor-pointer' key={blog._id}>

                                <BsThreeDotsVertical className='absolute right-5' onClick={() => setActiveBlogId(blog._id === activeBlogId ? null : blog._id)} />

                                {activeBlogId === blog._id && (
                                    <div className='flex flex-col items-center absolute right-6 top-10 bg-white border border-gray-100 py-2 rounded-lg'>
                                        <div className='px-12 py-1' onClick={handleEditBlog}>Edit</div>
                                        <hr className='bg-gray-800 w-full' />
                                        <div className='px-12 py-1' onClick={handleDeleteBlog}>Delete</div>
                                    </div>
                                )}

                                <div className='w-full min-h-10'>
                                    <img src={blogImg} alt='blog image' />
                                </div>
                                <div className='flex  justify-between items-center'> <h2 className='text-xl font-bold'>{blog?.title}</h2>
                                    <span className='bg-red-200 rounded-2xl px-2 py-1 text-center text-sm border border-red-400'>{blog.tags}</span></div>

                                <p className='text-gray-800 my-3'>{blog?.content}</p>
                                <div className='mt-5 text-gray-400'>Author : <span className='text-indigo-900'>{blog?.author}</span></div>
                            </div>
                        ))
                    ) : ("No blogs found")}


                </div>
            </div>

            {showModal && (
                <div className=' flex  justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 bg-gray-600'>
                    <div className=' bg-white border border-gray-300  w-1/2 m-5 rounded-xl py-10'>
                        <div className="px-20">
                            <div className='flex justify-end'><button onClick={() => setShowModal(false)}><IoMdClose /></button></div>

                            <form className="space-y-3">
                                {/* Blog Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-900">
                                        Blog Title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder="Enter blog title"
                                            required
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Tags */}
                                <div>
                                    <label htmlFor="tags" className="block text-sm font-medium text-gray-900">
                                        Tags
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="tags"
                                            name="tags"
                                            type="text"
                                            placeholder="e.g., tech, development, tutorials"
                                            value={formData.tags}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Author */}
                                <div>
                                    <label htmlFor="author" className="block text-sm font-medium text-gray-900">
                                        Author
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="author"
                                            name="author"
                                            type="text"
                                            placeholder="Author name"
                                            value={formData.author}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Blog Content */}
                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-900">
                                        Content
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="content"
                                            name="content"
                                            placeholder="Write your blog content here..."
                                            required
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm h-20 resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Toggle between URL or Upload */}
                                {/* <div className="mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setUseUrl(!useUrl)}
                                        className="text-indigo-600 underline"
                                    >
                                        {useUrl ? 'Upload an Image' : 'Use Image URL'}
                                    </button>
                                </div> */}

                                {/* Image URL or File Upload */}
                                {/* {useUrl ? (
                                        <div>
                                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-900">
                                                Image URL
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="imageUrl"
                                                    name="imageUrl"
                                                    type="url"
                                                    placeholder="Image URL (optional)"
                                                    value={formData.imageUrl}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <label htmlFor="imageFile" className="block text-sm font-medium text-gray-900">
                                                Upload Image
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="imageFile"
                                                    name="imageFile"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="block w-full text-gray-900"
                                                />
                                            </div>
                                        </div>
                                    )} */}

                                {/* Submit Button */}
                                <div className="flex justify-center items-center gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm border border-gray-900"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 border border-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={setEditBlog ? handleUpdateBlog : handleAddBlog}
                                    >
                                        {setEditBlog ? "Save" : "Publish Blog"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Blogs;
