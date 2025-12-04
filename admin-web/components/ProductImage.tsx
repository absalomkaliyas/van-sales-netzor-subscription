'use client'

import { useState } from 'react'

interface ProductImageProps {
  src?: string | null
  alt: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-12 w-12',
  md: 'h-24 w-24',
  lg: 'h-48 w-48',
}

export default function ProductImage({ src, alt, className = '', size = 'sm' }: ProductImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  if (!src || imageError) {
    return (
      <div
        className={`${sizeClasses[size]} bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500 border border-gray-200 ${className}`}
      >
        <span className="text-center px-1">No Image</span>
      </div>
    )
  }

  return (
    <div className={`${sizeClasses[size]} relative ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-100 rounded flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} object-cover rounded border border-gray-200 ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
        onError={() => setImageError(true)}
        onLoad={() => setImageLoading(false)}
      />
    </div>
  )
}

