import AutoScroll from 'embla-carousel-auto-scroll'
import { useTranslation } from 'react-i18next'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel'

interface Logo {
  id: string
  description: string
  image: string
  className?: string
}

interface Logos3Props {
  heading?: string
  logos?: Logo[]
  className?: string
}

const defaultLogos = [
  {
    id: 'logo-1',
    description: 'Logo 1',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg',
    className: 'h-7 w-auto',
  },
  {
    id: 'logo-2',
    description: 'Logo 2',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg',
    className: 'h-7 w-auto',
  },
  {
    id: 'logo-3',
    description: 'Logo 3',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-wordmark.svg',
    className: 'h-7 w-auto',
  },
  {
    id: 'logo-4',
    description: 'Logo 4',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-wordmark.svg',
    className: 'h-7 w-auto',
  },
  {
    id: 'logo-5',
    description: 'Logo 5',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark.svg',
    className: 'h-7 w-auto',
  },
  {
    id: 'logo-6',
    description: 'Logo 6',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg',
    className: 'h-7 w-auto',
  },
  {
    id: 'logo-8',
    description: 'Logo 8',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg',
    className: 'h-7 w-auto',
  },
]

function Logos3({
  heading,
  logos = defaultLogos,
}: Logos3Props) {
  const { t } = useTranslation()

  return (
    <section className="py-24 border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6 flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
          {heading ?? t('trust.openSource')}
        </h2>
      </div>
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <div>
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={`${logo.className} logo-image`}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

export { Logos3 }
