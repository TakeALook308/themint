import { useCallback } from 'react';
import moment from 'moment';
function Timer(resetTime) {
  const countDownTimer = (sec) => {
    function show() {
      try {
        const nowTime = moment();
        const retime = moment(resetTime);
        let showtime = sec + (retime - nowTime) / 1000;
        if (showtime < 0) {
          // clearInterval(timer);
          document.getElementById('timer').innerHTML = 0;
          return;
        } else {
          document.getElementById('timer').innerHTML = showtime;
          console.log(showtime);
        }
      } catch (e) {
        console.log(e);
      }
    }
    setInterval(show, 100);
  };
  return <span id="timer">{countDownTimer(30)}</span>;
}

export default Timer;
