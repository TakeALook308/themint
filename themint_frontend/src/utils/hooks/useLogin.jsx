import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loggedinState, myInformationState } from '../../atoms';
import { successToast } from '../../lib/toast';
import { setRefreshToken } from '../apis/api';
import { LOGIN_MESSAGE } from '../constants/constant';
import { setCookie } from '../functions/cookies';

function useSetLoggedIn() {
  const setUserInfo = useSetRecoilState(myInformationState);
  const setLogged = useSetRecoilState(loggedinState);
  const navigate = useNavigate();
  const setToken = ({ accessToken }) => {
    setCookie('accessToken', accessToken);
  };
  const moveToMain = (nickname) => {
    successToast(`${nickname}${LOGIN_MESSAGE.SUCCESS_LOGIN[makeRandomNumber()]}`);
    navigate('/main');
  };

  return async (func, data) => {
    try {
      const response = await func(data);
      const {
        data: { memberId, memberSeq, nickname, accessToken, refreshToken },
      } = response;
      setUserInfo({ memberId, memberSeq, nickname });
      setToken({ accessToken });
      moveToMain(nickname);
      setLogged(true);
      setRefreshToken(refreshToken);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };
}

export default useSetLoggedIn;

const makeRandomNumber = () => {
  const len = LOGIN_MESSAGE.SUCCESS_LOGIN.length;
  return Math.floor(Math.random() * len);
};
