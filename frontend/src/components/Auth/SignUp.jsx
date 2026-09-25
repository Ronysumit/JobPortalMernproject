import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API } from '../constApiPath/constApi'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/REDUX/authSlice'
import { Spinner } from '../ui/spinner'


function SignUp() {

    const [input, setInput] = useState({
        fullname: "",
        email: '',
        phoneNumber: '',
        password: '',
        role: "",
        file: null
    })
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector(store => store.auth)

    const chnageEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFile = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const formData = new FormData();

            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append('phoneNumber', input.phoneNumber);
            formData.append("password", input.password);
            formData.append("role", input.role);
            if (input.file) {
                formData.append('file', input.file);
            }

            const resp = await axios.post(`${API}/register`,
                formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })

            if (resp.data.success) {
                toast.success(resp.data.message);
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    },[user, navigate])

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-full max-w-md font-bold text-xl border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='flex flex-col gap-4 justify-center my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            name="fullname"
                            placeholder="Enter name"
                            onChange={chnageEventHandler}
                        />
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={chnageEventHandler}
                        />
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={chnageEventHandler}
                        />
                        <Label>Phone Number</Label>
                        <Input
                            type="number"
                            name="phoneNumber"
                            placeholder="Enter Number"
                            onChange={chnageEventHandler}
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className='flex items-center space-x-2'>
                                <Input
                                    id="r1"
                                    type="radio"
                                    name="role"
                                    checked={input.role === 'student'}
                                    value="student"
                                    className="cursor-pointer"
                                    onChange={chnageEventHandler}
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    id="r2"
                                    type="radio"
                                    name="role"
                                    checked={input.role === 'recruiter'}
                                    value="recruiter"
                                    className="cursor-pointer"
                                    onChange={chnageEventHandler}
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>

                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                name="file"
                                className="cursor-pointer"
                                onChange={changeFile}
                            />
                        </div>
                    </div>
                    <Button disabled={loading} type="submit" className="w-full my-4">
                        {
                            loading ? (<Spinner />) : ("Sign Up")
                        }
                    </Button>
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'> Log In</Link></span>
                </form>

            </div>

        </div>
    )
}

export default SignUp