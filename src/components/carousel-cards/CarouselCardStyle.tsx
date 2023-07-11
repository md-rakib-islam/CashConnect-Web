import styled from "styled-components";

export const StyledCarouselCard1 = styled.div`
  position: relative;
  text-align: left;
  // margin-left: 280px;
  // display: flex;
  // margin-left: 1rem;
  width: 100%
  justify-content: space-between;
  align-items: center;
  // padding: 1rem 0 0.65rem 0;

  .sliderInfo{
    position: relative;
    position: absolute;
    top: 100px;
    left: 16px;

  }
  .title {
    // flex-grow: 1;
    font-size: 50px;
    margin-top: 0px;
    margin-bottom: 1.35rem;
    line-height: 1.2;
    color: whitesmoke;
  }

  .image-holder {
    // flex-grow: 1;
    
    position: relative;
    //   width: 50%;
    img {
     height: 100%;
      width: 100%;
    }
  }

  @media only screen and (max-width: 869px) {
  margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    .title {
      font-size: 32px;
    }
    .image-holder {
    position: relative;
    //   width: 50%;
    img {
      height: 120%;
      width: 100%;
    }
  }
  }

  @media only screen and (max-width: 425px) {
    margin-left: 0px;
    margin-right: 0px;
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

      height: 120%;
      width: 100%;
    }
  }
`;
