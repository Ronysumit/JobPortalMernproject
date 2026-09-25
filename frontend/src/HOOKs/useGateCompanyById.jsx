import axios from 'axios'
import React, { useEffect } from 'react'
import { ADMIN_API } from "../components/constApiPath/constApi"
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/REDUX/comapnaySlice'

function useGateCompanyById(companyId) {
    const dispatch = useDispatch()
    useEffect(() => {
        if (!companyId) return;
        const featchsingleCompany = async () => {
            try {
                const res = await axios.get(`${ADMIN_API}/getompanyById/${companyId}`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                console.log(error);
            }
        }
        featchsingleCompany();
    }, [companyId, dispatch])
}

export default useGateCompanyById