import * as React from "react"

import { cn } from "@/lib/utils"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps
>(({ className, label, ...props }, ref) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className={cn(
          "h-4 w-4 rounded border border-input ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2",
          className
        )}
        ref={ref}
        {...props}
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }