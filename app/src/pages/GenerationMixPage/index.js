import React from 'react';
import Api from './../../hooks/useApi';
import regionList from '../../utils/regions';
import Map from './../../components/Map/Map';

import './styles.css'

const preprocessData = (rawData) => {
    const tmp = rawData["data"][0]["data"][0]["generationmix"];
    let formattedData = Object();
    tmp.sort((a, b) => a.perc > b.perc ? -1 : 1).forEach((e) => {
        formattedData[e.fuel] = e.perc;
    })

    return formattedData;
};

const GenerationMixPage = () => {

    const [region, setRegion] = React.useState("London");
    const getGenerationData = Api.useApi(Api.getGenerationMix, preprocessData);

    React.useEffect(() => {
        const regionToNum = regionList[region];
        getGenerationData.request(regionToNum);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [region]);

    return (
        <>
            <h1>Generation Mix</h1>
            <h3>You can click on the regions in the map to display their current generation mix</h3>
            <div className='generation-mix'>
                <Map setter={setRegion} />
                {getGenerationData.loading && <h1>Loading</h1>}
                {getGenerationData.error && <h1>{getGenerationData.error}</h1>}
                <div className='mix-values'>
                    {!getGenerationData.loading && <>
                        <h1>{region}</h1>
                        <div className='mix-values-container'>
                            <div className='fuel-names'>
                                {getGenerationData.data && !getGenerationData.loading &&
                                    Object.keys(getGenerationData.data).map((e) => (
                                        <div key={e + "_key"} > {e} </div>
                                    ))
                                }
                            </div>
                            <div>
                                {getGenerationData.data && !getGenerationData.loading &&
                                    Object.keys(getGenerationData.data).map((e) => (
                                        <div key={e + "_value"} > {getGenerationData.data[e]} %</div>
                                    ))

                                }
                            </div>
                        </div>
                    </>
                    }
                </div>
            </div >
        </>
    )
}

export default GenerationMixPage;