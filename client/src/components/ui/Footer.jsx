import React from 'react';
import styled from 'styled-components';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import ChatIcon from '@mui/icons-material/Chat';

function Footer(props) {
  return (
    <Wrapper>
      <FooterHeader>더민트</FooterHeader>
      <FooterBody>
        <FooterText>
          <p>고객센터 | themint@mint.co.kr</p>
          <p>광고문의 | themint@mint.co.kr</p>
          <p>제휴 및 대회 협력 | themint@mint.co.kr</p>
          <br />
          <p>
            주식회사 더민트 | 대표 강민서 김수환 김혜성 남은열 정민호 | 서울특별시 강남구 테헤란로
            212 멀티캠퍼스 11층
          </p>
          <p>사업자 등록번호 211-00-000000</p>
          <br />
          <p>
            <span>더민트 </span>© 2022 by 더민트, Inc. All rights reserved.
          </p>
        </FooterText>
        <FooterItem>
          <YouTubeIcon />
          <InstagramIcon />
          <ChatIcon />
        </FooterItem>
      </FooterBody>
    </Wrapper>
  );
}
export default Footer;

const Wrapper = styled.div`
  border-top: solid;
  border-top-width: 2px;
  border-top-color: ${(props) => props.theme.colors.subBlack};
  background: ${(props) => props.theme.colors.mainBlack};
  max-width: 1024px;
  margin-top: 20px;
  margin: auto;
`;

const FooterHeader = styled.h1`
  font-family: 'PyeongChangPeace-Bold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChangPeace-Bold.woff2')
    format('woff2');
  font-weight: 700;
  font-style: normal;
  font-size: 24px;
  color: ${(props) => props.theme.colors.mainMint};
  margin-bottom: 20px;
  margin-top: 20px;
`;

const FooterBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const FooterText = styled.div`
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue',
    'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
  line-height: 140%;
  // 글자간격 조정 맨 하단부 글자 더민트 폰트 변경
  > p > span {
    font-family: 'PyeongChangPeace-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChangPeace-Bold.woff2')
      format('woff2');
  }
`;

const FooterItem = styled.div`
  align-self: flex-end;
  margin-left: auto;
  width: 100px;
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  align-items: center;
`;
