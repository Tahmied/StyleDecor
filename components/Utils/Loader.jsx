const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <style>
        {`
          @keyframes loader-spin {
            0% {
              box-shadow: #dfdfdf -20px 0px, #dfdfdf 20px 0px;
            }
            25% {
              box-shadow: #dfdfdf -15px -15px, #dfdfdf 15px 15px;
            }
            50% {
              box-shadow: #dfdfdf 0px -20px, #dfdfdf 0px 20px;
            }
            75% {
              box-shadow: #dfdfdf 15px -15px, #dfdfdf -15px 15px;
            }
            100% {
              box-shadow: #dfdfdf 20px 0px, #dfdfdf -20px 0px;
            }
          }
          .loader-dot {
            animation: loader-spin 1.2s infinite;
          }
        `}
      </style>
      <div className="w-[15px] h-[15px] rounded-full bg-[#dfdfdf] loader-dot" />
    </div>
  );
}

export default Loader;