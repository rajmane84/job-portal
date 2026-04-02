import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const statusCardVariants = cva(
  "relative overflow-hidden transition-all duration-200 hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border",
        admin: "bg-linear-to-br from-slate-800 to-slate-900 text-white border-none",
        employer: "bg-linear-to-br from-indigo-500 to-purple-600 text-white border-none",
        success: "bg-linear-to-br from-emerald-500 to-teal-600 text-white border-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatusCardProps extends VariantProps<typeof statusCardVariants> {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

export function StatusCard({
  label,
  value,
  icon,
  description,
  variant,
  className,
}: StatusCardProps) {
  return (
    <Card className={cn(statusCardVariants({ variant }), className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-col space-y-1">
            <span className={cn(
              "text-sm font-medium",
              variant === 'default' ? "text-muted-foreground" : "text-white/80"
            )}>
              {label}
            </span>
            <span className="text-xl lg:text-2xl font-bold tracking-tight">
              {value}
            </span>
            {description && (
              <p className={cn(
                "text-xs mt-1",
                variant === 'default' ? "text-muted-foreground" : "text-white/60"
              )}>
                {description}
              </p>
            )}
          </div>
          
          {icon && (
            <div className={cn(
              "p-2 rounded-lg",
              variant === 'default' ? "bg-primary/10 text-primary" : "bg-white/10 text-white"
            )}>
                {/* @ts-ignore */}
              {React.cloneElement(icon as React.ReactElement, { size: 24 })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}