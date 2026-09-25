import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, AwardIcon } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { useNavigate } from 'react-router-dom'
import { ADMIN_API } from '../constApiPath/constApi'
import { useSelector } from 'react-redux'
import useGateCompanyById from '@/HOOKs/useGateCompanyById'

function CompanySetUp() {
    const params = useParams();
    useGateCompanyById(params.id)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { singleCompany } = useSelector(store => store.company)
    const submitHandaler = async (e) => {
        e.preventDefault();

        const fromData = new FormData();
        fromData.append("name", input.name);
        fromData.append("description", input.description);
        fromData.append("website", input.website);
        fromData.append("location", input.location);
        if (input.file) {
            fromData.append("file", input.file)
        }
        setLoading(true)
        try {
            const resp = await axios.put(`${ADMIN_API}/updatecomapny/${params.id}`, fromData, {
                withCredentials: true
            })

            if (resp.data.success) {
                toast.success(resp.data.message);
                navigate("/admin/companies");
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (!singleCompany) return;
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || ""
        })
    }, [singleCompany])
    return (
        <>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form action="" onSubmit={submitHandaler} >
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Compnay Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={input.name}
                                onChange={(e) => setInput({ ...input, name: e.target.value })}

                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                placeholder="Enter description"
                                value={input.description}
                                onChange={(e) => setInput({ ...input, description: e.target.value })}

                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                placeholder="Enter website"
                                value={input.website}
                                onChange={(e) => setInput({ ...input, website: e.target.value })}

                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                placeholder="Enter location"
                                value={input.location}
                                onChange={(e) => setInput({ ...input, location: e.target.value })}

                            />
                        </div>
                        <div>
                            <Label>File</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                placeholder="upload file"
                                name="file"
                                onChange={(e) => setInput({ ...input, file: e.target.files[0] })}
                            />
                        </div>

                    </div>
                    <Button className='w-full mt-8' type="submit" disabled={loading}>
                        {loading ? <Spinner /> : "Update"}
                    </Button>

                </form>
            </div>

        </>
    )
}

export default CompanySetUp