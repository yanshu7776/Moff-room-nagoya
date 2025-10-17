import * as React from "react"
import { InstagramIcon as Tiktok } from "lucide-react"

/**
 * Wrap Lucide-React’s `Tiktok` icon so we can keep a consistent
 * Pascal-Case export throughout the code-base.
 *
 * Usage:
 *   import { TikTokIcon } from "@/components/icons"
 *   <TikTokIcon className="h-5 w-5" />
 */
export const TikTokIcon = React.forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<typeof Tiktok>>(
  (props, ref) => <Tiktok ref={ref} {...props} />,
)

TikTokIcon.displayName = "TikTokIcon"
