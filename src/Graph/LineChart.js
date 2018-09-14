import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./LineChart.css";
import PropTypes from 'prop-types';

class StockLineChart extends Component {
	render () {
    const { cac, nasdaq } = this.props;

    // Finding highest value for the line chart Y axis
    const maxCac = Math.max(parseFloat(cac));
    const maxNasdaq = Math.max(parseFloat(nasdaq));
    const yScale = maxCac > maxNasdaq ? (Math.round(maxCac) + 10 ) : (Math.round(maxNasdaq) + 10 );

    // Making the object needed by the LineChart component
    const data = cac.map((value, index) => {
      return {
          name: index + 1,
          cac: value,
          nasdaq: nasdaq[index],
          ampt: 20
      };
    });

  	return (
    	<LineChart
        className="LineChart"
        width={800}
        height={500}
        data={data}
        margin={{top: 5, right: 30, left: 20, bottom: 5}} >
         <XAxis dataKey="name"/>
         <YAxis type="number" domain={[0, yScale]}/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend />
         <Line dot={false} strokeWidth={2} name="NASDAQ" dataKey="nasdaq" stroke="#8884d8" animationDuration={500}/>
         <Line dot={false} strokeWidth={2} name="CAC40" dataKey="cac" stroke="#82ca9d" animationDuration={500}/>
      </LineChart>
    );
  }
}

export default StockLineChart;


StockLineChart.propTypes = {
  cac: PropTypes.array.isRequired,
  nasdaq: PropTypes.array.isRequired,
};
