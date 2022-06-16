
export const getRange = (hoursBack, hoursForward) => {
    let now = new Date();
    const msToHour = 60 * 60 * 1000;

    let past = new Date(now.getTime() - hoursBack * msToHour);
    let next = new Date(now.getTime() + hoursForward * msToHour);

    let nowStr = now.toISOString();
    let pastStr = past.toISOString();
    let nextStr = next.toISOString();
    console.log(nowStr, pastStr, nextStr);

    nowStr = nowStr.slice(0, 16) + "Z";
    pastStr = pastStr.slice(0, 16) + "Z";
    nextStr = nextStr.slice(0, 16) + "Z";

    return {
        nowStr,
        nextStr,
        pastStr,
    }
}