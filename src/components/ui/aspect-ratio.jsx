"use client";

import * as React from "react"

import { cn } from "@/lib/utils"

const AspectRatio = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative w-full", className)}
    {...props}
  />
))
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }