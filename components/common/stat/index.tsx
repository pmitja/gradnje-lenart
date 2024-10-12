'use client'

import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'

interface StatProps {
  subtitle: string
  endValue: number
  duration?: number
  isPercentage?: boolean
}

export interface StatType {
  subtitle: string
  endValue: number
  isPercentage?: boolean
}

const Stat: React.FC<StatProps> = ({ subtitle, endValue, duration = 2, isPercentage = false }) => {
  const titleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          innerHTML: '0',
        },
        {
          innerHTML: endValue.toString(),
          duration,
          ease: 'power1.inOut',
          snap: {
            innerHTML: 1,
          },
          onUpdate: () => {
            if (titleRef.current) {
              titleRef.current.innerHTML = parseInt(titleRef.current.innerHTML, 10).toLocaleString()
            }
          },
        },
      )
    }
  }, [ endValue, duration ])

  return (
    <div className="flex-1 rounded-sm bg-body-200 p-5 text-secondary-300 shadow-md">
      <p className="text-2xl font-bold md:text-3xl">
        {!isPercentage && <span className="mr-1">+</span>}
        <span ref={titleRef}>0</span>
        {isPercentage && <span>%</span>}
      </p>
      <p className="text-lg md:text-xl">{subtitle}</p>
    </div>
  )
}

export default Stat
