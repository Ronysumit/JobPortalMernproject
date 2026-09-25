import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux';

function LatestJobs() {
    const { alljobs } = useSelector(store => store.job)
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span>Job Opening</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    alljobs.length > 0 ?

                        alljobs?.slice(0, 6).map((j) => <LatestJobCards key={j._id} job={j} />) : (<span><h3>No job Available</h3></span>)
                }
            </div>

        </div>
    )
}

export default LatestJobs