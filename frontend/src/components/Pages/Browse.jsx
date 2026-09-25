import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import JobCard from './JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/REDUX/jobSlice';
import useGetAllJobs from '@/HOOKs/useGetAllJobs';
function Browse() {
    useGetAllJobs();
    const {alljobs} = useSelector((store)=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
       return()=> {
        dispatch(setSearchedQuery(""));
       }
    }, [])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>search Results {alljobs?.length}</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        alljobs.map((job) => {
                            return (
                                <div key={job?._id}>
                                    <JobCard job={job} />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse