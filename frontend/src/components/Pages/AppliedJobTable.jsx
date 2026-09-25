import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'
function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job)
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAppliedJobs.length > 0 ? (allAppliedJobs.map((item) => (
              <TableRow key={item._id}>
                <TableCell>  {new Date(item?.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{item?.job?.title}</TableCell>
                <TableCell>{item?.job?.companyId?.name}</TableCell>
                <TableCell className="text-right"><Badge>{item?.status}</Badge></TableCell>
              </TableRow>
            ))) : (<TableRow >
              <TableCell colSpan={4} className="text-center">
                No applied jobs found
              </TableCell>
            </TableRow>
            )}
        </TableBody>
      </Table>
    </div >
  )
}

export default AppliedJobTable