export default function HeadingLight({ children = "FEEDBACK" }) {
  return (
    <p
      className="
        text-center 
        uppercase 
        font-[ClashDisplay-Medium]
        font-medium
        leading-[0.8] 
        tracking-[-0.04em]
        mt-12
        bg-gradient-to-b from-white to-[#9FADBE]
        bg-clip-text text-transparent

        text-[225px]
        max-[1320px]:text-[150px]
        max-[1024px]:text-[130px]
        max-[768px]:text-[80px]
        max-[425px]:text-[60px]
        max-[425px]:mt-2
        max-[325px]:text-[45px]
        max-[325px]:mt-2
        mb-12
      "
    >
      {children}
    </p>
  );
}
