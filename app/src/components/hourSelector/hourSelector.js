import React from 'react';

function HourSelector(props) {

    const handleChangePrevHour = (e) => {
        props.setPastHour(e.target.value)
    }
    const handleChangeNextHour = (e) => {
        props.setNextHour(e.target.value)
    }

    return (
        <form>
            <label>
                Prev Hour:
                <input type="number" step="1" value={props.pastHour} onChange={handleChangePrevHour} />
            </label>
            <label>
                Next Hour:
                <input type="number" step="1" value={props.nextHour} onChange={handleChangeNextHour} />
            </label>
        </form>
    )
}

export default HourSelector;