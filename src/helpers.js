// helper function which do not affect app state


// convert duration ISO-8061 to hh:mm
export function humanizeDuration(duration) {
  const isoregex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  let matches = duration.match(isoregex);
  if(matches) {
    let parsed = parseFloat(matches[7]) || 0;
    // let hours = 0;
    // let minutes = 0;

    let minutes = Math.floor(parsed%60);
    let hours = (parsed-minutes) / 60;
    
    return hours + ' hr ' + minutes + ' min ';
  } else {
    return 'unknown';
  }
}