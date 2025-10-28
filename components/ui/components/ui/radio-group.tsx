"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

const merge = (...cls: Array<string | undefined>) =>
  cls.filter(Boolean).join(" ");

export const RadioGroup = ({
  className,
  ...props
}: RadioGroupPrimitive.RadioGroupProps) => (
  <RadioGroupPrimitive.Root
    className={merge("grid gap-2", className)}
    {...props}
  />
);

export const RadioGroupItem = React.forwardRef<
  HTMLButtonElement,
  RadioGroupPrimitive.RadioGroupItemProps
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={merge(
      "aspect-square h-4 w-4 rounded-full border border-gray-300",
      "data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="block h-full w-full rounded-full bg-orange-500" />
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = "RadioGroupItem";

export default RadioGroup;
