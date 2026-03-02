export const timeFormat = (secs:number) => {

    var minFormat = Math.floor(secs / 60) < 10 ? `0${Math.floor(secs / 60)}` : Math.floor(secs / 60);
    var secFormat = secs % 60 < 10 ? `0${secs % 60}` : secs % 60;

    return `${minFormat}:${secFormat}`
}