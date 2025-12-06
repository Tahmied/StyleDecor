
const Headings = ({ text, styles }) => {
    if (!styles) {
        return (
            <h2
                className="font-urbanist font-normal text-[40px] md:text-[60px] lg:text-[90px] text-center capitalize mb-8 max-w-[340px]:!text-[35px]"
                style={{
                    background:
                        'linear-gradient(90deg, #0B141F 0%, #BAC9DD 33.17%, #BAC9DD 60.1%, #0B141F 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}
            >
                {text}
            </h2>
        );
    }
    return (
        <h2
            className={`font-urbanist font-normal text-[40px] md:text-[60px] lg:text-[90px] text-center capitalize mb-8 max-w-[340px]:!text-[35px] ${styles}`}
            style={{
                background:
                    'linear-gradient(90deg, #0B141F 0%, #BAC9DD 33.17%, #BAC9DD 60.1%, #0B141F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}
        >
            {text}
        </h2>
    );
};

export default Headings;