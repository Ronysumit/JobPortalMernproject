import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API } from "../constApiPath/constApi"
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/REDUX/authSlice'
import { Spinner } from '../ui/spinner'


function Login() {
  const {user} = useSelector(store => store.auth);
  const [input, setInPut] = useState({
    email: "",
    password: "",
    role: ""
  })
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth)
  const handlChangeEmail = (e) => {
    setInPut({
      ...input,
      email: e.target.value
    })
  }

  const handleChangePassword = (e) => {
    setInPut({
      ...input,
      password: e.target.value
    })
  }

  const handleRoleChange = (e) => {
    setInPut({
      ...input,
      role: e.target.value
    })
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const resp = await axios.post(`${API}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      if (resp.data.success) {
        dispatch(setUser(resp.data.user))
        toast.success(resp.data.message);
        navigate('/');
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }

  }

  useEffect(()=> {
     if(user) {
        navigate('/')
     }
  }, [user, navigate])

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-full max-w-md font-bold text-xl border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Log In</h1>
          <div className='flex flex-col gap-5 justify-center my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter email"
              name="email"
              value={input.email}
              onChange={handlChangeEmail}
            />
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={input.password}
              onChange={handleChangePassword}
            />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className='flex items-center space-x-2'>
                <Input
                  id="r1"
                  type="radio"
                  name="role"
                  value="student"
                  onChange={handleRoleChange}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Input
                  id="r2"
                  type="radio"
                  name="role"
                  value="recruiter"
                  onChange={handleRoleChange}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button disabled={loading} type="submit" className="w-full my-4">
            {
              loading ? (<Spinner />) :
                ("Log In")
            }

          </Button>
          <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Sign Up</Link></span>
        </form>

      </div>

    </div>
  )
}

export default Login