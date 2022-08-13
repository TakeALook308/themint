import { toast } from 'react-toastify';

export const successToast = (text, time = 3000) => {
  toast.success(text, {
    position: 'top-center',
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};

export const errorToast = (text, time = 3000) => {
  toast.error(text, {
    position: 'top-center',
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};

export const infoToast = (text, time = 3000) => {
  toast.info(text, {
    position: 'top-center',
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};
