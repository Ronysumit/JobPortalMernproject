import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/REDUX/applications'
import { APPLICATION_API } from '../constApiPath/constApi'

function Applicants() {

    const params = useParams();
    const dispatch = useDispatch()
    const { applicants } = useSelector((store) => store.application)
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API}/getApplicants/${params.id}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job))
                    console.log('applicats:- ', res.data.job)
                }
            } catch (error) {
                console.log(error?.response?.data?.message)
            }
        }
        fetchAllApplicants()
    }, [])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicanits <span className='text-red-500'>{applicants?.applications?.length}</span></h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants