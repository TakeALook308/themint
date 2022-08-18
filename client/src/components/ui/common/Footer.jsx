import React from 'react';
import styled from 'styled-components';
import { AiOutlineYoutube, AiOutlineInstagram } from 'react-icons/ai';
import { BsChatLeftDots } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../common/Logo';
function Footer(props) {
  const location = useLocation();

  if (
    location.pathname.startsWith('/streamings') ||
    location.pathname.startsWith('/register') ||
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/help')
  )
    return null;
  return (
    <Wrapper>
      <FooterHeader>
        <Logo size={'80px'} />
      </FooterHeader>
      <FooterBody>
        <FooterText>
          <p>고객센터 | themint@mint.co.kr</p>
          <p>광고문의 | themint@mint.co.kr</p>
          <p>제휴 및 대외 협력 | themint@mint.co.kr</p>
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
          <Link to="/">
            <AiOutlineYoutube size={25} />
          </Link>
          <Link to="/">
            <AiOutlineInstagram size={25} />
          </Link>
          <Link to="/">
            <BsChatLeftDots size={20} />
          </Link>
        </FooterItem>
      </FooterBody>
    </Wrapper>
  );
}
export default Footer;

const Wrapper = styled.footer`
  border-top: solid;
  border-top-width: 2px;
  border-top-color: ${(props) => props.theme.colors.subBlack};
  background: ${(props) => props.theme.colors.mainBlack};
  max-width: 1024px;
  margin-top: 20px;
  margin: auto;
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

const FooterHeader = styled.div`
  padding: 1rem 0;
`;
