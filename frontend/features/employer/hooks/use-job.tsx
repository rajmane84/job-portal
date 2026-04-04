import { useQuery } from "@tanstack/react-query";
import {
  getMyJobPostings,
  GetMyJobPostingsResponse,
} from "../services/job.service";
import { ApiSuccessResponse } from "@/lib/api-client";

export const useGetMyJobPostings = () => {
  return useQuery<ApiSuccessResponse<GetMyJobPostingsResponse>>({
    queryKey: ["my-job-postings"],
    queryFn: getMyJobPostings,
  });
};
