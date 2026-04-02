"use client";

import { useSession } from "next-auth/react";
import {
  Briefcase,
  Check,
  Clock,
  Infinity,
  Star,
  Zap,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  formatCurrency,
  formatJobLimit,
  formatDuration,
} from "@/features/employer/helper/plan.helper";
import { loadRazorpayScript } from "@/lib/razorpay-script";
import { createOrder } from "@/features/employer/services/payment.service";
import type { Plan } from "../types";

export function PlanCard({ plan }: { plan: Plan }) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const isUnlimited = plan.jobPostLimit === -1;

  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    try {
      const payload = {
        amount: Number(plan.price) * 100,
        planId: plan._id,
        userId: userId!,
        internalOrderId: `ORD_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      };

      const orderData = await createOrder(payload);
      console.log("Order created:", orderData);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.data.order.amount,
        currency: orderData.data.order.currency,
        name: "Job Portal",
        description: `Upgrade to ${plan.name} Plan`,
        order_id: orderData.data.order.id,
        handler: function (response: any) {
          window.location.href = `/employer/dashboard?payment=success&orderId=${orderData.data.order.id}`;
        },
        prefill: {
          name: session?.user?.name || "Employer",
          email: session?.user?.email || "",
        },
        theme: {
          color: plan.isFeatured ? "#7c3aed" : "#2563eb",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initialize payment.");
    }
  };

  return (
    <Card
      className={cn(
        "relative flex h-full flex-col border-2 transition-all duration-300",
        plan.isFeatured
          ? "border-primary shadow-primary/10 z-10 scale-[1.02] shadow-xl"
          : "border-border hover:shadow-lg",
      )}
    >
      {/* Badges / Ribbons */}
      <div className="absolute top-0 right-0 flex">
        {plan.isFeatured && (
          <Badge className="bg-primary text-primary-foreground rounded-none rounded-bl-lg px-3 py-1 font-bold">
            <Star className="mr-1 h-3 w-3 fill-current" />
            Most Popular
          </Badge>
        )}
      </div>

      {plan.isDefault && (
        <div className="absolute top-0 left-0">
          <Badge
            variant="secondary"
            className="rounded-none rounded-br-lg px-3 py-1 font-semibold"
          >
            Current Default
          </Badge>
        </div>
      )}

      {/* Header Section */}
      <CardHeader
        className={cn(
          "px-6 pt-10 pb-6",
          plan.isFeatured ? "bg-primary/5" : "bg-muted/30",
        )}
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">{plan.name}</h2>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {plan.description || "Tailored hiring solutions for your business."}
          </p>
        </div>

        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-black">
            {formatCurrency(plan.price, plan.currency)}
          </span>
          <span className="text-muted-foreground text-sm font-medium">
            /{formatDuration(plan.durationDays)}
          </span>
        </div>

        {/* Quick Stats Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="bg-background flex gap-1.5 px-2.5 py-1"
          >
            <Briefcase className="text-primary h-3.5 w-3.5" />
            {formatJobLimit(plan.jobPostLimit)}
          </Badge>
          <Badge
            variant="outline"
            className="bg-background flex gap-1.5 px-2.5 py-1"
          >
            {isUnlimited ? (
              <Infinity className="text-primary h-3.5 w-3.5" />
            ) : (
              <Clock className="text-primary h-3.5 w-3.5" />
            )}
            {formatDuration(plan.durationDays)} Validity
          </Badge>
        </div>
      </CardHeader>

      {/* Features Content */}
      <CardContent className="flex-1 px-6 pt-6">
        <ul className="space-y-3">
          {plan.features.length > 0 ? (
            plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="bg-primary/10 mt-1 rounded-full p-0.5">
                  <Check className="text-primary h-3.5 w-3.5" strokeWidth={3} />
                </div>
                <span className="text-foreground/80 text-sm leading-snug">
                  {feature}
                </span>
              </li>
            ))
          ) : (
            <li className="text-muted-foreground flex items-center gap-2 text-sm italic">
              <AlertCircle className="h-4 w-4" />
              Standard features included
            </li>
          )}
        </ul>
      </CardContent>

      {/* Footer Action */}
      <CardFooter className="px-6 pb-8">
        <Button
          onClick={handlePayment}
          size="lg"
          className={cn(
            "group w-full cursor-pointer font-bold transition-all active:scale-95",
            plan.isFeatured ? "shadow-primary/20 shadow-lg" : "",
          )}
          variant={plan.isFeatured ? "default" : "outline"}
        >
          <Zap
            className={cn(
              "mr-2 h-4 w-4 transition-transform group-hover:scale-110",
              plan.isFeatured ? "fill-current" : "text-primary",
            )}
          />
          Get {plan.name}
        </Button>
      </CardFooter>
    </Card>
  );
}
