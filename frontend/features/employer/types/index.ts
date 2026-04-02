export interface Plan {
  _id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  durationDays: number;
  jobPostLimit: number;
  isFeatured: boolean;
  isDefault: boolean;
  displayOrder: number;
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RazorpayOrder {
  id: string;
  entity: "order";
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: "created" | "attempted" | "paid";
  attempts: number;
  notes: Record<string, any> | any[];
  created_at: number;
  offer_id: string | null;
}

export interface Coupon {
  _id: string;
  code: string;
  type: "percentage" | "amount";
  value: number;
  isActive: boolean;
  expiryDate?: Date;
  maxUses: number;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}