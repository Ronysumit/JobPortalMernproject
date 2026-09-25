import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API } from "../components/constApiPath/constApi"
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../REDUX/jobSlice'

function useGetAllJobs() {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector((store) => store.job)
    useEffect(() => {
        const featchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API}/getAllJobs?keyword=${searchedQuery}`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.job))
                }
            } catch (error) {
                console.log(error);
            }
        }
        featchAllJobs();
    }, [])
}

export default useGetAllJobs