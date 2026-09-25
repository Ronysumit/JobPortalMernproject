import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API } from "../components/constApiPath/constApi"
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '../REDUX/jobSlice'

function useGetAllAdminJobs() {
    const dispatch = useDispatch()
    useEffect(() => {
        const featchAdminAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API}/getJobsByAdmin`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.job))
                    console.log("adminJobs:-", res.data.job)
                } else {
                    dispatch(setAllAdminJobs([]));
                }
            } catch (error) {
                console.log(error);
                dispatch(setAllAdminJobs([]));

            }
        }
        featchAdminAllJobs();
    }, [])
}

export default useGetAllAdminJobs
