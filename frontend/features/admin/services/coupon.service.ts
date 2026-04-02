import apiClient from "@/lib/api-client";
import { CouponFormValues } from "../validations/coupon.schema";

export async function createCoupon(payload: CouponFormValues) {
    const response = await apiClient.post("/coupons", payload);
    return response.data;
}