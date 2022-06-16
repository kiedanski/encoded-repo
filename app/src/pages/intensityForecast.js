import React from 'react';
import Api from './../hooks/useApi';
import HourSelector from '../components/hourSelector/hourSelector';

const preprocessData = (rawData) => {

    let formattedData = [];
    rawData["data"].forEach((d, i) => {
        let time = d["from"];
        formattedData.push({
            "time": time,
            "value": d["intensity"]["actual"],
            "kind": "actual"
        });
        formattedData.push({
            "time": time,
            "value": d["intensity"]["forecast"],
            "kind": "forecast"
        });

    })
    console.log(formattedData)
    return formattedData;
}


const getRange = (hoursBack, hoursForward) => {
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

function IntensityForecast() {

    const [hoursBack, setHoursBack] = React.useState(1);
    const [hoursForward, setHoursForward] = React.useState(1);
    const getIntensityData = Api.useApi(Api.getIntensity, preprocessData);

    React.useEffect(() => {
        const dateStr = getRange(hoursBack, hoursForward);
        getIntensityData.request(dateStr.pastStr, dateStr.nextStr);

    }, [hoursBack, hoursForward]);
    return (
        <div>
            <h1> IntensityForecast </h1>
            <HourSelector
                pastHour={hoursBack}
                nextHour={hoursForward}
                setPastHour={setHoursBack}
                setNextHour={setHoursForward}
            />

            {getIntensityData.loading && <h1>Loading</h1>}
            {getIntensityData.error && <h1>{getIntensityData.error}</h1>}
            {getIntensityData.data &&
                getIntensityData.data.map((e, i) => (
                    <h2 key={i}>{e["time"]} {e["value"]}</h2>
                ))

            }
        </div>
    )
}

export default IntensityForecast;