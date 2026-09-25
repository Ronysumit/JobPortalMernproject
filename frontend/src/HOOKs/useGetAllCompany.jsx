import axios from 'axios'
import React, { useEffect } from 'react'
import { ADMIN_API } from "../components/constApiPath/constApi"
import { useDispatch } from 'react-redux'
import { setCompanies } from '@/REDUX/comapnaySlice'


function useGetAllCompany() {
    const dispatch = useDispatch()
    useEffect(() => {

        const fetchAllCompanies = async () => {
            try {
                const res = await axios.get(`${ADMIN_API}/getcompany`, {
                    withCredentials: true
                })
                if (res.data.success) {
                     dispatch(setCompanies(res.data.companies));
                    console.log("companies:-", res.data.companies)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCompanies();
    }, [])
}

export default useGetAllCompany
