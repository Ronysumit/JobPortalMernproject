import { APPLICATION_API } from "@/components/constApiPath/constApi";
import { setAllAppliedJobs } from "@/REDUX/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"

const UseGetAppliedJobs = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API}/getAppliedJobs`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.allApplications));
                }
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        }
        fetchAppliedJobs()
    }, [dispatch])
}

export default UseGetAppliedJobs