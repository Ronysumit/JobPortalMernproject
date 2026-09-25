import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



function AdminJobsTable() {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJob, setFilterJob] = useState(allAdminJobs)
    const navigate = useNavigate()
    console.log("allDminJobs", allAdminJobs)
    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            }

            return job?.companyId?.name
                ?.toLowerCase()
                .includes(searchJobByText.toLowerCase()) ||
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
        })

        setFilterJob(filteredJobs)
    }, [allAdminJobs, searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted jobs </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJob.length === 0 ? (

                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                You haven't registered any company yet.
                            </TableCell>

                        </TableRow>

                    ) : (

                        filterJob.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>
                                    {job?.companyId?.name}
                                </TableCell>

                                <TableCell>
                                    {job?.title}
                                </TableCell>

                                <TableCell>
                                    {new Date(job.createdAt)
                                        .toLocaleDateString('en-GB')
                                        .replace(/\//g, '-')}
                                </TableCell>

                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger className="cursor-pointer">
                                            <MoreHorizontal />
                                        </PopoverTrigger>

                                        <PopoverContent className="w-fit">
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}`)}
                                                className="flex items-center gap-2 w-fit cursor-pointer"
                                            >
                                                <Edit className="w-4" />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicatios`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Applications</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}

                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable