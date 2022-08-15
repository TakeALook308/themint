import { useEffect } from 'react';
import { errorToast } from '../../lib/toast';
import useLogout from '../../utils/hooks/useLogout';

function LogoutPage(props) {
  const logout = useLogout();
  useEffect(() => {
    errorToast('토큰이 만료되었습니다.');
    logout({ type: '' });
  }, []);
  return;
}

export default LogoutPage;
