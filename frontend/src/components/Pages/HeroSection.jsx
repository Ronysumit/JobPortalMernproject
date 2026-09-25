import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/REDUX/jobSlice';
function HeroSection() {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(search));
        console.log("search query" , search)
        navigate("/browse")
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium mx-auto'>No 1 Job hunt Website</span>
                <h1 className='text-5xl font-bold'>Search , Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Discover relevant opportunities, connect with leading employers, and take the next step toward your career goals.</p>
                <div className="flex w-[40%] shadow-lg border border-green-200 pl-3 rounded-full items-center gap-4 mx-auto">
                    <Input
                        type="text"
                        placeholder="Find your dream jobs"
                        className='outline-none border-none w-full'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={searchJobHandler} className="rounded-full bg-[#6A38C2]" >
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection