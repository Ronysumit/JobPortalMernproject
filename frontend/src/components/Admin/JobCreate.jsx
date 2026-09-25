import React, { useState } from 'react'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue, SelectTrigger } from '../ui/select'
import { Label } from '../ui/label'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '../ui/spinner'
import { JOB_API } from '../constApiPath/constApi'

function JobCreate() {

    const { companies } = useSelector((store) => store.company);
    const [selectedCompanyName, setSelectedCompanyName] = useState("");
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const jobhandleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API}/postJob`, input,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            )

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs")
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Navbar />

            <div className="flex  items-center justify-center w-screen my-5">

                <form
                    onSubmit={submitHandler}
                    className="w-[50%] border border-gray-200 rounded-md p-6"
                >
                    <h1 className="text-2xl font-bold mb-5">
                        Create New Job
                    </h1>

                    {/* Title */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={jobhandleChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                placeholder="Frontend Developer"
                            />
                        </div>

                        {/* Description */}

                        <div className="mb-4">
                            <Label>Description</Label>
                            <Input
                                name="description"
                                value={input.description}
                                onChange={jobhandleChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                placeholder="Job description"
                            />
                        </div>
                        {/* Requirements */}
                        <div className="mb-4">
                            <Label>Requirements</Label>
                            <Input
                                name="requirements"
                                value={input.requirements}
                                onChange={jobhandleChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                placeholder="React, JavaScript, Node.js"
                            />
                        </div>

                        {/* Salary */}
                        <div className="mb-4">
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={jobhandleChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                placeholder="5-8 LPA"
                            />
                        </div>
                        <div className="mb-4">
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={jobhandleChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                placeholder="location"
                            />
                        </div>

                        {/* Job Type */}
                        <div className="mb-4">
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={jobhandleChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                placeholder="Full Time"
                            />
                        </div>

                        {/* Experience */}
                        <div className="mb-4">
                            <Label>Experience</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={jobhandleChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                placeholder="0-2 years"
                            />
                        </div>

                        {/* Position */}
                        <div className="mb-4">
                            <Label>Number of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={jobhandleChange}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                min="1"
                            />
                        </div>

                        {/* Company */}
                        <div className="mb-4">
                            <Label>Select Company</Label>
                            {
                                companies.length > 0 &&
                                <Select
                                    value={selectedCompanyName}   // ✅ matches SelectItem values (names)
                                    onValueChange={(value) => {
                                        const selectedCompany = companies.find(
                                            (company) => company.name.toLowerCase() === value
                                        )

                                        setSelectedCompanyName(value)          // for display
                                        setInput({
                                            ...input,
                                            companyId: selectedCompany._id      // for backend
                                        })
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem
                                                    key={company._id}
                                                    value={company?.name?.toLowerCase()}
                                                >
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            }
                        </div>

                    </div>

                    <Button disabled={loading} type="submit" className="w-full mt-4">
                        {
                            loading ? <Spinner /> : "Create Job"
                        }
                    </Button>
                    {
                        companies.length == 0 && <p className='text-red-600 text-center font-bold mt-4 my-3'>*Please register a company first</p>
                    }
                </form>

            </div>
        </div>
    )
}

export default JobCreate