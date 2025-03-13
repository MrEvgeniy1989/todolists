import { cn } from "@/shared/utils/merge-cn"
import { ComponentPropsWithoutRef, ComponentRef, forwardRef, memo, ReactNode } from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"

type CardProps = {
  asChild?: boolean
  children?: ReactNode
} & ComponentPropsWithoutRef<"div">

export const Card = memo(
  forwardRef<ComponentRef<"div">, CardProps>(
    ({ asChild = false, className, children, ...props }, ref) => {
      const Component = asChild ? Slot : "div"

      const classes = cn(
        `rounded-lg border p-5 border-border bgSecondary shadow-lg shadow-shadow`,
        className,
      )

      return (
        <Component {...props} className={classes} ref={ref}>
          <Slottable>{children}</Slottable>
        </Component>
      )
    },
  ),
)
