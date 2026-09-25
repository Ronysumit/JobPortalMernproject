import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { User, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../constApiPath/constApi";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/REDUX/authSlice";
const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const resp = await axios.get(`${API}/logout`, {
                withCredentials: true
            })
            if (resp.data.success) {
                toast.success(resp.data.message);
                dispatch(setUser(null));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed")
        }
    }
    return (
        <>
            <div className="bg-white">
                <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                    <div>
                        <h1 className="text-2xl font-bold cursor-pointer">Job<span className="text-[#F83002]">portal</span></h1>
                    </div>
                    <div className="flex items-center justify-between gap-12">
                        <ul className="flex items-center gap-5 cursor-pointer">
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <Link to="/admin/companies">Companies</Link>
                                        <Link to="/admin/jobs">Jobs</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/">Home</Link>
                                        <Link to="/jobs">Jobs</Link>
                                        <Link to="/browse">Browse</Link>
                                    </>
                                )
                            }

                        </ul>

                        {
                            !user ? (
                                <div className="flex items-center gap-0.5">
                                    <div>
                                        <Link to="/login">
                                            <Button variant="outline" className="cursor-pointer">Login</Button>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="/signup">
                                            <Button className="cursor-pointer">Signin</Button>
                                        </Link>
                                    </div>
                                </div>

                            ) :
                                (<Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-80">
                                        <div className="flex gap-4 space-y-2">
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium">{user?.fullname}</h4>
                                                <p className="text-sm text-muted-foreground">{user?.profile.bio}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-start text-gray-400">

                                            {
                                                user && user.role === 'student' && (

                                                    <div className="flex items-center my-3">
                                                        <User size={20} />
                                                        <Button className="cursor-pointer" variant="link"><Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className="flex items-center">
                                                <LogOutIcon size={20} />
                                                <Button onClick={handleLogout} className="cursor-pointer" variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </PopoverContent>

                                </Popover>
                                )}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar


