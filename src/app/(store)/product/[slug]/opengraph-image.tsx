import { ImageResponse } from 'next/og'
import { zinc } from 'tailwindcss/colors'

import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { env } from '@/env'

export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

interface ImageProps {
  params: {
    slug: string
  }
}

export async function getProduct(slug: string) {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60 * 1, // 1 hour
    },
  })
  return (await response.json()) as Product
}

// Image generation
export default async function Image({ params }: ImageProps) {
  const product = await getProduct(params.slug)

  const productImageURL = new URL(
    product.image,
    env!.NEXT_PUBLIC_APP_URL,
  ).toString()
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: zinc['950'],
        }}
      >
        <img src={productImageURL} alt="" style={{ width: '100%' }} />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}
