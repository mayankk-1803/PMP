import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-[15px] font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E7757] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] will-change-transform",
  {
    variants: {
      variant: {
        default:
          "bg-[#6E7757] text-white hover:bg-[#4E583F] shadow-[0_4px_14px_rgba(110,119,87,0.25)] hover:shadow-[0_8px_24px_rgba(110,119,87,0.35)]",
        outline:
          "border border-[#6E7757] bg-white text-[#6E7757] hover:bg-[#F8F5EF] hover:border-[#4E583F]",
        ghost: "hover:bg-[#EFE7DB] text-[#6B6B63] hover:text-[#2B2B2B]",
        gold: "bg-[#C8A36A] text-white hover:bg-[#b8925a] shadow-[0_4px_14px_rgba(200,163,106,0.25)] hover:shadow-[0_8px_24px_rgba(200,163,106,0.35)]",
        link: "text-[#6E7757] underline-offset-4 hover:underline hover:scale-100 hover:translate-y-0",
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
