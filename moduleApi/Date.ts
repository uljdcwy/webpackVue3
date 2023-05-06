// 格式化时间方法  第一个叁数为 时间格式，第二个为 时间对象
// 例  YY 则返回 23 年 YYYY-MM 则返回 2023-02 月 YYYY-MM-DD 则返回年月日，也可以选择全部格式 YYYY-MM-DD hh:mm:ssZ
export function getFormatTime(format = 'YYYY-MM-DD hh:mm:ss', date = new Date()) {
    // 获取传入的时间
    date = (typeof date === 'string' || typeof date === 'number') ? new Date(date) : date;
    let getFullYear = date.getFullYear();
    let getMonth = date.getMonth() + 1;
    // @ts-ignore
    getMonth = (getMonth < 10) ? ('0' + getMonth) : getMonth;
    let getDate = date.getDate();
    // @ts-ignore
    getDate = (getDate < 10) ? ('0' + getDate) : getDate;
    let getHours = date.getHours();
    // @ts-ignore
    getHours = (getHours < 10) ? ('0' + getHours) : getHours;
    let getMinutes = date.getMinutes();
    // @ts-ignore
    getMinutes = (getMinutes < 10) ? ('0' + getMinutes) : getMinutes;
    let getSeconds = date.getSeconds();
    // @ts-ignore
    getSeconds = (getSeconds < 10) ? ('0' + getSeconds) : getSeconds;
    let getMilliseconds = date.getMilliseconds();
    // @ts-ignore
    getMilliseconds = (getMilliseconds < 10) ? ('00' + getMilliseconds) : (getMilliseconds < 100) ? ('0' + getMilliseconds) : getMilliseconds;
    // let replaceStr = `${getFullYear}$2${getMonth}$4${getDate}$6${getHours}$8${getMinutes}$10${getSeconds}$12`;
    // format.replace(/([a-z]+)([^a-zA-Z.]+)+/,replaceStr);
    let dateStr = "";
    let regArr = '';
    // @ts-ignore
    while (regArr = /(Y{1,4}|M{1,2}|D{1,2}|h{1,2}|m{1,2}|s{1,2}|S{1,3})([^YMDhmsS]*)/.exec(format)) {
        let regLength = regArr[0];
        let currentFormat = regArr[1];
        let currentPlaceholder = regArr[2];
        switch (currentFormat[0]) {
            case 'Y':
                dateStr += dateFormat(getFullYear, currentFormat, currentPlaceholder || '', 4);
                break;
            case 'M':
                dateStr += dateFormat(getMonth, currentFormat, currentPlaceholder || '', 2);
                break;
            case 'D':
                dateStr += dateFormat(getDate, currentFormat, currentPlaceholder || '', 2);
                break;
            case 'h':
                dateStr += dateFormat(getHours, currentFormat, currentPlaceholder || '', 2);
                break;
            case 'm':
                dateStr += dateFormat(getMinutes, currentFormat, currentPlaceholder || '', 2);
                break;
            case 's':
                dateStr += dateFormat(getSeconds, currentFormat, currentPlaceholder || '', 2);
                break;
            case 'S':
                dateStr += dateFormat(getMilliseconds, currentFormat, currentPlaceholder || '', 3);
                break;
        }
        format = format.slice(regLength.length, format.length);
    };

    function dateFormat(currentDateStr, currentFormat, currentPlaceholder, maxLen) {
        currentDateStr = currentDateStr.toString();
        return currentDateStr.slice((maxLen - currentFormat.length), currentDateStr.length) + currentPlaceholder
    };
    return dateStr;
}