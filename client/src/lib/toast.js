import { toast } from 'react-toastify';

<<<<<<< HEAD
export const successToast = (text, time = 3000) => {
=======
export const successToast = (text, theme = 'colored', time = 3000) => {
>>>>>>> 15cda8f0fdfcc47a57bb3aaf582e74606bfc7a21
  toast.success(text, {
    position: 'top-center',
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });
};

<<<<<<< HEAD
export const errorToast = (text, time = 3000) => {
=======
export const errorToast = (text, theme = 'colored', time = 3000) => {
>>>>>>> 15cda8f0fdfcc47a57bb3aaf582e74606bfc7a21
  toast.error(text, {
    position: 'top-center',
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });
};

<<<<<<< HEAD
export const infoToast = (text, time = 3000) => {
=======
export const infoToast = (text, theme = 'colored', time = 3000) => {
>>>>>>> 15cda8f0fdfcc47a57bb3aaf582e74606bfc7a21
  toast.info(text, {
    position: 'top-center',
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });
};
