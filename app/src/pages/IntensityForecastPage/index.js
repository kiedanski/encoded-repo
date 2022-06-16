import React from 'react';
import * as d3 from 'd3';

import Api from './../../hooks/useApi';
import HourSelector from '../../components/hourSelector/hourSelector';
import LineChart from '../../components/lineChart/LineChart';
import { getRange } from '../../utils/helpers';

import './styles.css'

const preprocessData = (rawData) => {

    const parseDate = d3.utcParse('%Y-%m-%dT%H:%MZ')
    let formattedData = [];
    rawData["data"].forEach((d, i) => {
        let time = parseDate(d["to"]);
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
    return formattedData;
}


function IntensityForecastPage() {

    const [hoursBack, setHoursBack] = React.useState(3);
    const [hoursForward, setHoursForward] = React.useState(1);
    const getIntensityData = Api.useApi(Api.getIntensity, preprocessData);

    React.useEffect(() => {
        const dateStr = getRange(hoursBack, hoursForward);
        getIntensityData.request(dateStr.pastStr, dateStr.nextStr);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hoursBack, hoursForward]);
    return (
        <div>
            <h1> Intensity Forecast </h1>
            <h3>You can change the inputs below to load more or less carbon intensity data. You can also hover over a marker to see its value</h3>
            <HourSelector
                pastHour={hoursBack}
                nextHour={hoursForward}
                setPastHour={setHoursBack}
                setNextHour={setHoursForward}
            />

            {getIntensityData.loading && <h1>Loading</h1>}
            {getIntensityData.error && <h1>{getIntensityData.error}</h1>}
            {getIntensityData.data && !getIntensityData.loading && <LineChart name="intensity-forecast" data={getIntensityData.data} />}
        </div>
    )
}

export default IntensityForecastPage;