import styled from "styled-components";

export const StyledCarouselCard1 = styled.div`
  text-align: left;
  // margin-left: 280px;
  display: flex;
  margin: 0px;
  width: 100%
  justify-content: space-between;
  align-items: center;
  // padding: 1rem 0 0.65rem 0;

  .title {
    font-size: 50px;
    margin-top: 0px;
    margin-bottom: 1.35rem;
    line-height: 1.2;
  }

  .image-holder {
    position: relative;
    //   width: 50%;
    img {
      height: 400px;
      width: 650px;
    }
  }

  @media only screen and (max-width: 900px) {
    margin-left: 0px;
    padding-left: 0px;

    .title {
      font-size: 32px;
    }
    .image-holder {
    position: relative;
    //   width: 50%;
    img {
      width: 100%;
    }
  }
  }

  @media only screen and (max-width: 425px) {
    margin-left: 0px;
    padding-left: 0px;
    .title {
      display: none;
    }
    .title + * {
      display: none;
    }
    .button-link {
      display: none;
     
    }
    .image-holder {

    position: relative;
    
    //   width: 50%;
    img {

      height: 180px;
      width: 100%;
    }
  }
`;
