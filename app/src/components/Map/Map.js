import React from 'react';
import { ukRegions } from '../../utils/uk';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGllZ29raWVkYW5za2kiLCJhIjoiY2w0ZGg5NW1kMDhmbjNsb2J4M2l3dzIxMSJ9.1oZwXd1fHXP9-HOD-ouBoA';


const initalCoordinates = {
    "lat": 54,
    "lon": -5,
    "zoom": 4,
};

const drawMap = (map, mapContainer, setter) => {

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [initalCoordinates.lon, initalCoordinates.lat],
        zoom: initalCoordinates.zoom,


    });

    map.current.once('load', () => {

        map.current.addSource('states', {
            'type': 'geojson',
            'data': ukRegions
        });
        map.current.addLayer({
            'id': 'regionslayer',
            'type': 'fill',
            'source': 'states',
            'layout': {},
            'paint': {
                'fill-color': '#627BC1',
                'fill-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    1,
                    0.5
                ]
            }
        });
        map.current.addLayer({
            'id': 'state-borders',
            'type': 'line',
            'source': 'states',
            'layout': {},
            'paint': {
                'line-color': ["get", "fill"], // '#627BC1',
                'line-width': 2
            }
        });

        map.current.on('click', 'regionslayer', (e) => {
            setter(e.features[0].properties.name);
        });

        // Change the cursor to a pointer when
        // the mouse is over the states layer.
        map.current.on('mouseenter', 'regionslayer', () => {
            map.current.getCanvas().style.cursor = 'pointer';
        });

        // Change the cursor back to a pointer
        // when it leaves the states layer.
        map.current.on('mouseleave', 'regionslayer', () => {
            map.current.getCanvas().style.cursor = '';
        });


        map.current.resize()

    });
}


function Map(props) {

    const mapContainer = React.useRef(null);
    const map = React.useRef(null);

    React.useEffect(() => {
        drawMap(map, mapContainer, props.setter);
    })

    return (
        <div ref={mapContainer} className="map-container" />
    )

}

export default Map;