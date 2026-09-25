import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function CompaniesTable() {
    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const [filterCompany, setfilterCompany] = useState(companies);
    const navigate = useNavigate()
    useEffect(() => {
        const filterCompany = companies.filter((c) => {
            if (!searchCompanyByText) {
                return true
            }

            return c?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setfilterCompany(filterCompany)
    }, [companies, searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies  </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Website</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.length === 0 ? (

                        <TableRow>
                            <TableCell colSpan={7} className="text-center">
                                You haven't registered any company yet.
                            </TableCell>

                        </TableRow>

                    ) : (

                        filterCompany.map((c) => (
                            <TableRow key={c._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={c.logo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>
                                    {c.name}
                                </TableCell>
                                <TableCell>
                                    {new Date(c.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                </TableCell>
                                <TableCell>
                                    {c.description}
                                </TableCell>
                                <TableCell>
                                    {c.location}
                                </TableCell>
                                <TableCell>
                                    {c.website}
                                </TableCell>
                                <TableCell className='text-right cursor-pointer'>
                                    <Popover>
                                        <PopoverTrigger className='cursor-pointer'><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-25'>
                                            <div onClick={()=>navigate(`/admin/companies/${c._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit className='w-4' />
                                                <span>Edit</span>
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

export default CompaniesTable