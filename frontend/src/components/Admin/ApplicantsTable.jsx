import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CheckIcon, XIcon, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API } from '../constApiPath/constApi';
const shortListingStatus = ["Accepted", "Rejected"];
function ApplicantsTable() {
    const { applicants } = useSelector((store) => store.application);
    const statusHandler = async (status, id) => {
        try {
            const res = await axios.patch(`${APPLICATION_API}/updateStatus/${id}`, { status }, { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of Your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        applicants?.applications?.map((application) => (
                            <TableRow key={application._id}>
                                <TableCell>{application?.applicant?.fullname}</TableCell>
                                <TableCell>{application?.applicant?.email}</TableCell>
                                <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                                <TableCell>

                                    {application?.applicant?.profile?.resume ?
                                        <a href={application?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline">{application?.applicant?.profile?.resumeOriginalName}
                                        </a> : <span className='text-blue-700'>NA</span>
                                    }
                                </TableCell>
                                <TableCell>
                                    {new Date(application?.applicant?.createdAt).toLocaleDateString("en-GB")}
                                </TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {
                                                shortListingStatus.map((status, index) => (
                                                    <div className='flex w-fit items-center cursor-pointer my-2' key={index}>
                                                        <span onClick={() => statusHandler(status, application?._id)} className='flex gap-3 items-center'>
                                                            {status}
                                                            {

                                                                status === "Accepted" ? (
                                                                    <CheckIcon size={20} className="hover:w-6 h-6 transition-all duration-200 hover:text-green-700" />
                                                                ) : (
                                                                    <XIcon size={20} className="hover:w-6 h-6  transition-all duration-200 hover:text-red-700" />
                                                                )


                                                            }
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </TableRow>
                        ))

                    }



                </TableBody>

            </Table>
        </div >
    )
}

export default ApplicantsTable