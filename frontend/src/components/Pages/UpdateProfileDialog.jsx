import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Spinner } from '../ui/spinner'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { setUser } from '@/REDUX/authSlice'
import axios from 'axios'
import { API } from '../constApiPath/constApi'
import { toast } from 'sonner'
import { useEffect } from 'react'


function UpdateProfileDialog({ open, setOpen }) {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: user?.profile?.resume
    })

    const dispatch = useDispatch();


    useEffect(() => {
        if (open && user) {
            setInput({
                fullname: user?.fullname || "",
                email: user?.email || "",
                phoneNumber: user?.phoneNumber || "",
                bio: user?.profile?.bio || "",
                skills: user?.profile?.skills?.join(", ") || "",
                file: user?.profile?.resume
            })
        }
    }, [open, user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const formData = new FormData();

            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("bio", input.bio);
            formData.append("skills", input.skills);
            if (input.file) {
                formData.append("file", input.file)
            }

            const resp = await axios.post(`${API}/updateProfile`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (resp.data.success) {
                toast.success(resp.data.message)
                // setInput({
                //     fullname: "",
                //     email: "",
                //     phoneNumber: "",
                //     bio: "",
                //     skills: "",
                //     file: null
                // })
                dispatch(setUser(resp.data.user))
                setOpen(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>

                        <div className="grid gap-4 py-4">
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name">
                                    Name
                                </Label>
                                <Input id="name"
                                    name="fullname"
                                    value={input.fullname}
                                    type="text"
                                    className="col-span-3"
                                    onChange={(e) => setInput({
                                        ...input,
                                        fullname: e.target.value
                                    })}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email">
                                    email
                                </Label>
                                <Input id="email"
                                    name="email"
                                    value={input.email}
                                    type="email"
                                    className="col-span-3"
                                    onChange={(e) => setInput({
                                        ...input,
                                        email: e.target.value
                                    })}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number">
                                    Number
                                </Label>
                                <Input id="number"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    type="tel"
                                    className="col-span-3"
                                    onChange={(e) => setInput({
                                        ...input,
                                        phoneNumber: e.target.value
                                    })}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio">
                                    Bio
                                </Label>
                                <Input id="bio"
                                    name="bio"
                                    value={input.bio}
                                    type="text"
                                    className="col-span-3"
                                    onChange={(e) => setInput({
                                        ...input,
                                        bio: e.target.value
                                    })}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills">
                                    Skills
                                </Label>
                                <Input id="skills"
                                    name="skills"
                                    value={input.skills}
                                    type="text"
                                    className="col-span-3"
                                    onChange={(e) => setInput({
                                        ...input,
                                        skills: e.target.value
                                    })}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file">
                                    Resume
                                </Label>
                                <Input id="file"
                                    name="resume"
                                    type="file"
                                    accept="application/pdf"
                                    className="col-span-3"
                                    onChange={(e) => setInput({
                                        ...input,
                                        file: e.target.files?.[0]
                                    })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button disabled={loading} type="submit" className="w-full my-3">
                                {
                                    loading ? (<Spinner />) : ("Update")
                                }
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog