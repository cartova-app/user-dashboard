import axiosInstance from "@/core/config/axiosInstance"

export const submitProfile = () => {
    return axiosInstance.get('/roles')
}