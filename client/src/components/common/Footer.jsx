import React from 'react';
import styled from 'styled-components';

function Footer(props) {
  return (
    <Wrapper>
      <FooterHeader>더민트</FooterHeader>
      <FooterBody>
        <div>
          <p>고객센터 | themint@mint.co.kr</p>
          <p>광고문의 | themint@mint.co.kr</p>
          <p>제휴 및 대회 협력 | themint@mint.co.kr</p>
          <br />
          <p>
            주식회사 더민트 | 대표 강민서 김수환 김혜성 남은열 정민호 | 서울특별시 강남구 테헤란로
            212 멀티캠퍼스 11층
          </p>
          <p>사업자 등록번호 211-00-000000</p>
          <p>더민트 C 2022 by 더민트, Inc. All rights reserved.</p>
        </div>
        <FooterItem>
          <button>Youtuve</button>
          <button>Insta</button>
          <button>Mintalk</button>
        </FooterItem>
      </FooterBody>
    </Wrapper>
  );
}
export default Footer;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid grey;
  background: ${(props) => props.theme.colors.mainBlack};
  max-width: calc(100% - 50px);
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
  margin-bottom: 10px;
`;

const FooterBody = styled.div`
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue',
    'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const FooterItem = styled.div`
  position: absolute;
  right: 50px;
`;
