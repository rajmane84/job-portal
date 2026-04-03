import apiClient, { ApiSuccessResponse } from "@/lib/api-client";

export const toggleUserStatus = async (userId: string, isActive: boolean) => {
    const response = await apiClient.put<ApiSuccessResponse<any>>(`/admin/users/${userId}/toggle-status`, { isActive });
    return response.data;
}

export const fetchAllUsers = async () => {
    const response = await apiClient.get<ApiSuccessResponse<any>>(`/admin/users`);
    return response.data;
}