import { cn } from "@/shared/lib/utils/merge-cn";
import { ComponentPropsWithoutRef, ComponentRef, forwardRef, memo, ReactNode } from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";

type CardProps = {
  asChild?: boolean;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export const Card = memo(
  forwardRef<ComponentRef<"div">, CardProps>(({ asChild = false, className, children, ...props }, ref) => {
    const Component = asChild ? Slot : "div";

    const classes = cn(
      `rounded-[2px] border p-5 border-Dark-300 bg-Dark-500 shadow-sm shadow-Dark-300 transition-all duration-300`,
      className,
    );

    return (
      <Component {...props} className={classes} ref={ref}>
        <Slottable>{children}</Slottable>
      </Component>
    );
  }),
);
