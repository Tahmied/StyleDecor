export default function HeadingLight({ text }) {
  return (
    <h2
      className="font-urbanist font-normal text-[40px] md:text-[60px] lg:text-[90px] text-center capitalize mb-8 max-w-[340px]:!text-[35px] text-[#0b141f]"
    >
      {text}
    </h2>
  );
}
