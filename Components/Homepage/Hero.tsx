import SearchBar from '@/Components/Homepage/SearchBar';

const Hero = () => {
    return (
        <>
            <section className="hero h-full">
                <div className="hero-container w-[90%] h-full mx-auto flex flex-col items-center justify-center max-w-6xl">
                    <p className="font-urbanist font-normal text-[35px] text-center tracking-[-0.02em] capitalize bg-[linear-gradient(90.87deg,rgba(184,192,200,0)_-3.19%,#C0DDFF_29.28%,rgba(160,184,212,0.859813)_65.45%,rgba(184,192,200,0)_102.57%)] bg-clip-text text-transparent leading-[40px] text-pretty min-[355px]:text-[40px] min-[355px]:leading-[50px] min-[407px]:text-[45px] md:text-[60px] md:leading-[70px] lg:text-[100px] min-[1200px]:!text-[120px] lg:leading-[120px] min-[1200px]:!leading-normal">
                        Timeless Event Styling
                    </p>
                    <p className="font-urbanist font-medium text-[13px] text-center tracking-[0.03em] lowercase text-[rgba(222,235,250,0.80)] mt-4 md:text-[16px] md:mt-6 lg:text-[20px] lg:mt-7 max-w-3xl">
                        With over <span className="text-white">12 years</span> of experience, StyleDecor specializes in transforming spaces into breathtaking masterpieces for weddings, corporate galas, and luxury homes
                    </p>
                    <SearchBar />
                </div>
            </section>
        </>
    );
};

export default Hero;