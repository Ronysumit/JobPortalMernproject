import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { JOB_API } from '../constApiPath/constApi'
import { useDispatch, useSelector } from 'react-redux'
import { setSinglejob } from '@/REDUX/jobSlice'
import { APPLICATION_API } from '../constApiPath/constApi'
import { toast } from 'sonner'

function JobDescription() {


    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [applied, setApplied] = useState(isApplied)
    useEffect(() => {
        const fetchsingleJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API}/getJobBYId/${jobId}`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setSinglejob(res.data.job))
                    setApplied(
                        res.data.job.applications?.some(
                            application => application.applicant === user?._id
                        ) || false
                    )
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchsingleJobs();
    }, [jobId, dispatch, user?._id])
    console.log(singleJob)

    const applyJobHandelar = async () => {
        try {
            const resp = await axios.post(`${APPLICATION_API}/applyJob/${jobId}`, {}, {
                withCredentials: true
            })
            if (resp.data.success) {
                setApplied(true)
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSinglejob(updateSingleJob)); // helps us to real time ui update
                toast.success(resp.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)
        }
    }

    console.log("USER ID:", user?._id)
    console.log("APPLICATIONS:", singleJob?.applications)
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position} positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}</Badge>
                    </div>
                </div>
                <Button
                    onClick={applied ? null : applyJobHandelar}
                    disabled={applied}
                    className={`rounded-lg ${applied
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-[#7209b7] hover:bg-[#5f32ad]'
                        }`}
                >
                    {applied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'> Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'> Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'> Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'> Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience}</span></h1>
                <h1 className='font-bold my-1'> Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                <h1 className='font-bold my-1'> Total Applicats: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'> Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt
                    ? new Date(singleJob.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    })
                    : ''}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription