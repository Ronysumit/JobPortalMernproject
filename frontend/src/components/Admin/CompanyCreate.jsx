import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ADMIN_API } from '../constApiPath/constApi'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/REDUX/comapnaySlice'
import { toast } from 'sonner'

function CompanyCreate() {
    const navigate = useNavigate();
    const [comapanyName, setCompnayName] = useState('');
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const resp = await axios.post(
                `${ADMIN_API}/registerCompany`,
                { name: comapanyName },
                { withCredentials: true }
            );

            if (resp.data.success) {
                dispatch(setSingleCompany(resp.data.company));

                toast.success(resp.data.message);

                const companyId = resp?.data?.company?._id;

                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h3 className='font-bold text-2xl'>Your Company Name</h3>
                    <p>What would you like to give your comapny name? you can change this later .</p>
                </div>
                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt , Microsoft etc."
                    onChange={(e) => { setCompnayName(e.target.value) }} />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant='outline' onClick={() => navigate('/admin/companies')}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate