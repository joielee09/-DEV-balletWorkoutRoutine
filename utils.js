export const secToMin = (seconds) => {
    // convert to second
    let sec = Math.floor(seconds*0.001);
    // convert to minute
    let min = Math.floor(parseInt(sec/60));
    sec = (sec%60);
    return `${min<10? "0"+min: min}:${sec<10? "0"+sec : sec}`;
};

