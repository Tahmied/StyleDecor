import { Card, CardContent } from '@/components/ui/card'

type Logos = {
  image: string
  alt: string
}

const LogoCloud = ({ logos }: { logos: Logos[] }) => {
  return (
    <section className='bg-muted !bg-[#9fadbe] py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-6 space-y-4 text-center sm:mb-16 lg:mb-12'>
          <h2 className='text-2xl text-[#0b141f] font-semibold md:text-3xl lg:text-4xl'>
            <span>Partnered With Industry Leaders</span>
          </h2>
          <p className='text-muted-foreground text-xl !text-gray-700'>Top companies choose StyleDecor for seamless scheduling, reliable service management, and a superior client experience.</p>
        </div>

        <Card className='py-14 shadow-lg'>
          <CardContent className='px-14'>
            <div className='flex flex-wrap items-center justify-center gap-x-16 gap-y-8 max-sm:flex-col'>
              {logos.map((logo, index) => (
                <img key={index} src={logo.image} alt={logo.alt} className='h-7' />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default LogoCloud
