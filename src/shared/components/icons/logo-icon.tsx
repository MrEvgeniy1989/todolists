import { SVGProps, Ref, forwardRef, memo } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="\u0421\u043B\u043E\u0439 1"
    width="40px"
    height="40px"
    viewBox="0 0 128 128"
    fill="currentColor"
    ref={ref}
    {...props}
  >
    <path d="M110.13 9.69A6.41 6.41 0 0 0 105.77 8h-32a10.18 10.18 0 0 0-2.48-4.86A9.94 9.94 0 0 0 63.94 0a9.9 9.9 0 0 0-9.88 8H22a6 6 0 0 0-6 6v108a6 6 0 0 0 6 6h84a5.94 5.94 0 0 0 6-6V14a5.85 5.85 0 0 0-1.87-4.31ZM55.86 12a2 2 0 0 0 2-2 5.91 5.91 0 0 1 6.08-6 5.88 5.88 0 0 1 4.46 1.86A6.19 6.19 0 0 1 70 10a2 2 0 0 0 2 2h12v12H44V12ZM108 122a2 2 0 0 1-2 2H22a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2h18v14a2 2 0 0 0 2 2h44a2 2 0 0 0 2-2V12h17.77a2.38 2.38 0 0 1 1.63.61A1.85 1.85 0 0 1 108 14Z" />
    <path d="M98 20h-4a2 2 0 0 0 0 4h2v88H32V24h2a2 2 0 0 0 0-4h-4a2 2 0 0 0-2 2v92a2 2 0 0 0 2 2h68a2 2 0 0 0 2-2V22a2 2 0 0 0-2-2Z" />
    <path d="M66 48h22a2 2 0 0 0 0-4H66a2 2 0 0 0 0 4ZM66 60h16a2 2 0 0 0 0-4H66a2 2 0 0 0 0 4ZM46 59.8a2 2 0 0 0 1.41.58h.09a2 2 0 0 0 1.5-.71L59.53 47a2 2 0 1 0-3.06-2.57l-9.19 11-5.87-5.86a2 2 0 0 0-2.82 2.83ZM88 76H66a2 2 0 0 1 0-4h22a2 2 0 0 1 0 4ZM82 88H66a2 2 0 0 1 0-4h16a2 2 0 0 1 0 4ZM47.41 88.38A2 2 0 0 1 46 87.8l-7.41-7.41a2 2 0 1 1 2.82-2.83l5.87 5.86 9.19-11A2 2 0 1 1 59.53 75L49 87.67a2 2 0 0 1-1.45.71Z" />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)
export { Memo as LogoIcon }
