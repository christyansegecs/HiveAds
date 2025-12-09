
// src/components/ui/IconSquareButton.tsx
'use client'

import Image from 'next/image'

interface IconSquareButtonProps {
  icon: string
  alt: string
}

export function IconSquareButton({ icon, alt }: IconSquareButtonProps) {

  return (
    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-md border border-[#D0D5DD] bg-white hover:bg-[#F9FAFB]"
    >
      <Image
        src={icon}
        alt={alt}
        width={12}
        height={12}
        className="shrink-0"
      />
    </button>
  )
}
