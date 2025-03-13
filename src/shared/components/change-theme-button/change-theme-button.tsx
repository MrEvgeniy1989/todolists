"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion as m } from "motion/react"

export const ChangeThemeButton = () => {
  const { theme, setTheme } = useTheme()
  const changeThemeOnClick = () => setTheme(theme === "light" ? "dark" : "light")

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }

  // Анимации для лучей солнца
  const raysVariants = {
    hidden: {
      strokeOpacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      strokeOpacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  // Анимации для одного луча
  const rayVariant = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      scale: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        pathLength: { duration: 0.3 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    },
  }

  // Анимация для бликов луны
  const shineVariant = {
    hidden: {
      opacity: 0,
      scale: 2,
      strokeDasharray: "20, 1000",
      strokeDashoffset: 0,
      filter: "blur(0px)",
    },
    visible: {
      opacity: [0, 1, 0],
      strokeDashoffset: [0, -50, -100],
      filter: ["blur(2px)", "blur(2px)", "blur(0px)"],
      transition: {
        duration: 0.75,
        ease: "linear",
      },
    },
  }

  // Пути для анимации солнца и луны
  const sunPath =
    "M49 68C59.4934 68 68 59.4934 68 49C68 38.5066 59.4934 30 49 30C38.5066 30 30 38.5066 30 49C30 59.4934 38.5066 68 49 68Z"
  const moonPath =
    "M49 68C59.4934 68 68 59.4934 68 49C51.8708 55.947 42.6762 48.1846 49 30C38.5066 30 30 38.5066 30 49C30 59.4934 38.5066 68 49 68Z"

  return (
    <div className={"flex items-center justify-center"}>
      <button
        onClick={changeThemeOnClick}
        className={"flex h-[30px] w-[30px] items-center justify-center"}
      >
        <m.svg
          strokeWidth="4"
          strokeLinecap="round"
          width={30}
          height={30}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative"
        >
          <m.path
            variants={shineVariant}
            d={moonPath}
            className={"absolute top-0 left-0 stroke-blue-100"}
            initial="hidden"
            animate={theme === "dark" ? "visible" : "hidden"}
          />

          <m.path
            fill="transparent"
            transition={{ duration: 1, type: "spring" }}
            initial={{
              fillOpacity: 0,
              strokeOpacity: 0,
              d: theme === "dark" ? moonPath : sunPath,
            }}
            animate={
              theme === "dark"
                ? {
                    d: moonPath,
                    fillOpacity: 0.35,
                    strokeOpacity: 1,
                    rotate: -360,
                    stroke: "var(--color-blue-400)",
                    fill: "var(--color-blue-400)",
                    scale: 2,
                    transition: { delay: 0.1, duration: 0.3 },
                  }
                : {
                    d: sunPath,
                    fillOpacity: 0.35,
                    strokeOpacity: 1,
                    rotate: 0,
                    stroke: "var(--color-yellow-600)",
                    fill: "var(--color-yellow-600)",
                    scale: 1,
                    transition: { delay: 0.1, duration: 0.3 },
                  }
            }
          />

          <m.g
            variants={raysVariants}
            initial="hidden"
            animate={theme === "light" ? "visible" : "hidden"}
            className="stroke-yellow-600 stroke-6"
            style={{ strokeLinecap: "round" }}
          >
            <m.path className="origin-center" variants={rayVariant} d="M50 2V11" />
            <m.path variants={rayVariant} d="M85 15L78 22" />
            <m.path variants={rayVariant} d="M98 50H89" />
            <m.path variants={rayVariant} d="M85 85L78 78" />
            <m.path variants={rayVariant} d="M50 98V89" />
            <m.path variants={rayVariant} d="M23 78L16 84" />
            <m.path variants={rayVariant} d="M11 50H2" />
            <m.path variants={rayVariant} d="M23 23L16 16" />
          </m.g>
        </m.svg>
      </button>
    </div>
  )
}
