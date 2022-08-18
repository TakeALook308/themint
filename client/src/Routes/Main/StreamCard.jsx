import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import GradientButton from '../../components/ButtonList/GradientButton';

function StreamCard({ auction }) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/streamings/${auction.hash}`);
  };
  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <StyledImg
            src={process.env.REACT_APP_IMAGE_URL + auction.auctionImage?.imageUrl}
            alt={`${auction.title} 썸네일`}
            width="200"
            height="200"
          />
        </ImgContainer>
        <AuctionInfoContainer>
          <AuctionText>
            <h3>{auction.title}</h3>
            <ProfileCard>
              <StreamProfile>
                <Link to={`/profile/${auction.memberSeq}`}>
                  <picture>
                    <img
                      src={process.env.REACT_APP_IMAGE_URL + auction.profileUrl}
                      alt={`${auction.nickname} 프로필 이미지`}
                      width="50"
                      height="50"
                    />
                  </picture>
                </Link>
              </StreamProfile>
              <p>{auction.nickname}</p>
            </ProfileCard>
            <p>{auction.content}</p>
          </AuctionText>
          <ButtonContainer>
            <GradientButton text={'경매참여'} size={'100px'} type={'button'} onClick={onClick} />
          </ButtonContainer>
        </AuctionInfoContainer>
      </Wrapper>
    </Container>
  );
}

export default StreamCard;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 65%;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 20px 30px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 2rem;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 15px;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.subBlack};
`;

const ImgContainer = styled.div`
  width: 65%;
  border-radius: 15px 0 0 15px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px 0 0 15px;
  object-fit: cover !important;
`;

const AuctionInfoContainer = styled.div`
  width: 35%;
  background: linear-gradient(270.38deg, #000000 2.06%, rgba(29, 29, 29, 0) 100%);
  text-align: left;
  border-radius: 0 15px 15px 0;
`;

const AuctionText = styled.div`
  padding: 1rem;
  width: 100%;
  height: 75%;
  > h3 {
    font-size: ${(props) => props.theme.fontSizes.h5};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 30px;
    width: 100%;
    font-weight: bold;
  }
  > p {
    font-size: ${(props) => props.theme.fontSizes.p};
    line-height: 20px;
    width: 100%;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const ProfileCard = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  > p {
    font-size: 12px;
    margin-left: 10px;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    > p {
      margin-left: 0;
    }
  }
`;

const StreamProfile = styled.div`
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.mainBlack};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  > picture {
    position: relative;
    height: 100%;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25%;
`;
