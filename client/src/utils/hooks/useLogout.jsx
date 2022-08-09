import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { session } from '../../App';
import { loggedinState, myInformationState } from '../../atoms';
import { infoToast } from '../../lib/toast';
import { removeCookie } from '../functions/cookies';

function useLogout() {
  const [myInformation, setMyinformation] = useRecoilState(myInformationState);
  const setLoggedin = useSetRecoilState(loggedinState);
  const navigate = useNavigate();

  return () => {
    infoToast(`${myInformation.nickname}님 다음에 또 오세요!`);
    setLoggedin(false);
    setMyinformation({ memberId: '', memberSeq: null, nickname: '' });
    removeCookie('accessToken');
    session.remove('profile');
    navigate('/main');
  };
}

export default useLogout;
