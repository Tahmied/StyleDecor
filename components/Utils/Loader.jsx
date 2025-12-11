import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    width: 15px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: #dfdfdf;
    box-shadow: #dfdfdf -20px 0px, #dfdfdf 20px 0px;
    animation: l18 1.2s infinite;
  }

  @keyframes l18 {
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
  }`;

export default Loader;
