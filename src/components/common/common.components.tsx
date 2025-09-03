"use client"

import React from 'react'

export function DisplayTitle({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <h2 className="scroll-m-20 border-b p-2 text-3xl font-semibold tracking-tight mx-5 first:mt-0">
      <span className="flex items-center gap-2">
        {icon}
        {title.toUpperCase()}
      </span>
    </h2>
  )
}

// display inner title with icon
export function DisplayInnerTitle({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <h3 className="scroll-m-20 border-b p-2 text-2xl font-semibold tracking-tight mx-5 first:mt-0">
      <span className="flex items-center gap-2">
        {icon}
        {title}
      </span>
    </h3>
  )
}
