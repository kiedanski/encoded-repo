import React from 'react';
import * as d3 from 'd3';


const parseDate = d3.utcParse('%Y-%m-%dT%H:%MZ')
const formatDate = d3.timeFormat("%a %H:%M");


const plotLineChart = (params, ref) => {

    const data = params.data

    const name = params.name || "linechart";
    const margin = { top: 20, right: 30, bottom: 30, left: 30 }
    const width = parseInt(d3.select('#' + name).style('width')) - margin.left - margin.right
    const height = parseInt(d3.select('#' + name).style('height')) - margin.top - margin.bottom

    const kinds = [...new Set(data.map(e => e["kind"]))]

    d3.select(ref.current).selectAll("g").remove();
    const svg = d3.select(ref.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    const max = d3.max(data, function (d) { return d.value }) * 1.2; // add some extra space 
    const min = d3.min(data, function (d) { return d.value }) * 0.8;


    // Prepare x Axis
    const x = d3.scaleTime()
        .domain(d3.extent(data, function (d) { return d.time }))
        .range([0, width])

    const xAxis = svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));


    // Prepare y axis 
    const y = d3.scaleLinear()
        .domain([min, max])
        .range([height, 0])

    const yAxis = svg.append('g')
        .call(d3.axisLeft(y));

    // List of colors to be used
    var color = d3.scaleOrdinal()
        .domain(kinds)
        .range(['#e41a1c', '#377eb8']);

    var tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'd3-tooltip')
        .style('position', 'absolute')
        .style('z-index', '10')
        .style('visibility', 'hidden')
        .style('padding', '10px')
        .style('background', 'rgba(0,0,0,0.6)')
        .style('border-radius', '4px')
        .style('color', '#fff')
        .text('a simple tooltip');

    const staticColor = '#437c90';
    const hoverColor = '#eec42d';

    // Generate the plots 
    kinds.map((k, i) => {
        // Generate the lines 
        svg.append('path')
            .datum(data.filter(x => x["kind"] === k))
            .attr('fill', 'none')
            .attr('stroke', color(k))
            .attr('stroke-width', 1)
            .attr('d', d3.line()
                .y(function (d) { return y(d.value) })
                .x(function (d) { return x(d.time) })
                .defined(function (d) { return d.value })
            )

        // Generate the markers with hoovers 
        svg.selectAll("dot")
            .data(data.filter(x => x["kind"] === k && x["value"]))
            .enter().append("circle")
            .attr("r", 2)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return y(d.value); })
            .on('mouseover', function (event, d, i) {
                tooltip
                    .html(
                        `<div>Time: ${formatDate(d.time)}</div><div>Value: ${d.value}</div>`
                    )
                    .style('visibility', 'visible');
                d3.select(this).transition().attr('fill', hoverColor);
            })
            .on('mousemove', function (event) {
                tooltip
                    .style('top', event.pageY - 10 + 'px')
                    .style('left', event.pageX + 10 + 'px');
            })
            .on('mouseout', function (event) {
                tooltip.html(``).style('visibility', 'hidden');
                d3.select(this).transition().attr('fill', staticColor);
            });

        // Add legend test and marker
        svg.append("text")
            .attr("x", width - margin.right)
            .attr("y", i * 25) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function (d) { return color(k) })
            .text(function (d) { return d })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .text(k)

        svg.append("circle")
            .attr("cx", width - margin.right - 20)
            .attr("cy", i * 25) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 7)
            .style("fill", function (d) { return color(k) })

    })

    let now = new Date().toISOString().slice(0, 16) + "Z";
    console.log(now)
    now = parseDate(now)
    svg.append("line")
        .attr("x1", x(now))
        .attr("y1", y(min))
        .attr("x2", x(now))
        .attr("y2", y(max))
        .style("stroke-width", 2)
        .style("stroke", "red")
        .style("fill", "none")
        .on('mouseover', function (event, d, i) {
            tooltip
                .html(
                    `<div>Current Time: ${formatDate(now)}</div>`
                )
                .style('visibility', 'visible');
            d3.select(this).transition().attr('fill', hoverColor);
        })
        .on('mousemove', function (event) {
            tooltip
                .style('top', event.pageY - 10 + 'px')
                .style('left', event.pageX + 10 + 'px');
        })
        .on('mouseout', function (event) {
            tooltip.html(``).style('visibility', 'hidden');
            d3.select(this).transition().attr('fill', staticColor);
        });

    svg.append('text')
        .attr('x', (width / 2))
        .attr('y', (margin.top / 5 - 10))
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .attr('fill', 'black')
        .text('Carbon Intensity')


}

function LineChart(props) {

    const ref = React.useRef();

    React.useEffect(() => {
        plotLineChart(props, ref)

    }, [props]);

    return (
        <div id={props.name || "linechart"}>
            <svg
                ref={ref}
            />
        </div>
    )

}

export default LineChart;
