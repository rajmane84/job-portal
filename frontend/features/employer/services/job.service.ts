import apiClient, { ApiSuccessResponse } from "@/lib/api-client";

export interface GetMyJobPostingsResponse {
    count: number;
    jobPosts: any[];
}

export const getMyJobPostings = async () => {
    const response = await apiClient.get<ApiSuccessResponse<GetMyJobPostingsResponse>>("/jobs/my-jobs");
    return response.data;
}
