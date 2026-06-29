import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-[15px] font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D32F2F] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] will-change-transform",
  {
    variants: {
      variant: {
        default:
          "bg-[#D32F2F] text-white hover:bg-[#C62828] shadow-[0_4px_14px_rgba(211,47,47,0.15)] hover:shadow-[0_8px_24px_rgba(211,47,47,0.25)]",
        outline:
          "border border-[#D32F2F] bg-white text-[#D32F2F] hover:bg-[#FDECEC] hover:border-[#C62828]",
        ghost: "hover:bg-[#FDECEC] text-[#555555] hover:text-[#D32F2F]",
        gold: "bg-[#EF5350] text-white hover:bg-[#C62828] shadow-[0_4px_14px_rgba(239,83,80,0.15)] hover:shadow-[0_8px_24px_rgba(239,83,80,0.25)]",
        link: "text-[#D32F2F] underline-offset-4 hover:underline hover:scale-100 hover:translate-y-0",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-xl px-4 text-sm",
        lg: "h-12 rounded-2xl px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as any}
        suppressHydrationWarning
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
