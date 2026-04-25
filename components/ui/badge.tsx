import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border-transparent gold-gradient text-black",
        secondary: "border-white/20 bg-zinc-900 text-white",
        destructive: "border-transparent bg-red-600 text-white",
        outline: "text-white border-white/20",
        success: "border-transparent bg-green-600 text-white",
        warning: "border-transparent bg-yellow-500 text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
