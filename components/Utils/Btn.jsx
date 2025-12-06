import Link from "next/link";

const Btn = ({ text, link, styles }) => {
    if (!styles) {
        return (
            <Link href={link}>
                <button className="bg-[#0b141f] cursor-pointer text-white px-8 py-4 rounded-full font-medium inline-flex items-center transition-all duration-200 ease-in hover:-translate-y-[3px] group">
                    {text}
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </Link>
        )
    }
    return (
        <Link className="" href={link}>
            <button className={`bg-[#0b141f] cursor-pointer text-white px-8 py-4 rounded-full font-medium transition-all duration-200 ease-in hover:-translate-y-[3px] group ${styles}`}>
                {text}
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </Link>

    );
};

export default Btn;