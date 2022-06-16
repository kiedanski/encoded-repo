import React from 'react';
import Api from './../hooks/useApi';
import regionList from './../utils/regions';
import Map from './../components/Map/Map';

const preprocessData = (rawData) => {
    const tmp = rawData["data"][0]["data"][0]["generationmix"];
    let formattedData = Object();
    tmp.forEach((e) => {
        formattedData[e.fuel] = e.perc;
    })
    return formattedData;
};

function GenerationMix() {

    const [region, setRegion] = React.useState("London");
    const getGenerationData = Api.useApi(Api.getGenerationMix, preprocessData);

    React.useEffect(() => {
        const regionToNum = regionList[region];
        getGenerationData.request(regionToNum);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [region]);

    return (
        <div>
            <h1>Generation Mix</h1>
            <Map setter={setRegion} />
            <h1>{region}</h1>
            {getGenerationData.loading && <h1>Loading</h1>}
            {getGenerationData.error && <h1>{getGenerationData.error}</h1>}
            {getGenerationData.data && !getGenerationData.loading &&
                Object.keys(getGenerationData.data).map((e) => (
                    <h2 key={e}>{e}: {getGenerationData.data[e]}</h2>
                ))

            }
        </div >
    )
}

export default GenerationMix;