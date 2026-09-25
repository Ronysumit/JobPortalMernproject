import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import FilterCard from './FilterCard'
import JobCard from './JobCard'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

function Jobs() {
  const { alljobs, searchedQuery } = useSelector(store => store.job);
  const [filterJob, setFilterJob] = useState(alljobs);
  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = alljobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        )
      })

      setFilterJob(filteredJobs)
    } else {
      setFilterJob(alljobs)
    }
  }, [alljobs, searchedQuery])
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-[20%]'>
            <FilterCard />
          </div>
          {
            alljobs.length === 0 ? <span>Job is not found</span> :
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                    filterJob.map((j) => {
                      return (
                        <motion.div
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{opacity:0, x: -100}}
                          transition={{ duration: 0.5 }}
                          key={j._id}>
                          <JobCard job={j} />
                        </motion.div>
                      )
                    })
                  }
                </div>

              </div>

          }
        </div>

      </div>


    </div>
  )
}

export default Jobs