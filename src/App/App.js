import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import StockLineChart from '../Graph/LineChart';
import Table from '../Table/Table';

class App extends Component {
  state = {
    nasdaq: [],
    cac: []
  }

  interval = () => setInterval(() => (axios.get("http://127.0.0.1:8000?count=20")
    // .then(data => this.setState({ data: data.data }))
    .then(data => this.transformData(data.data))
    .catch(error => console.log(error))), 1000);

  componentDidMount() {
    this.timer = this.interval();
  }

  changeStock = (evt) => {
    const id = evt.target.id;
    const value = evt.target.innerHTML;
    const stock = evt.target.className;
    if(!isNaN(value)) {
      if(stock === "cacValue") {
        const cac = [...this.state.cac];
        cac[id] = value;
        this.setState({ cac });
        console.log(this.state.cac);
      }
      if(stock === "nasdaqValue") {
        const nasdaq = [...this.state.nasdaq];
        nasdaq[id] = value;
        this.setState({ nasdaq });
        console.log(this.state.nasdaq);
      }
      this.launchTimer()
    };
    console.log(evt.target.className);
  }

  stopTimer = (evt) => {
    clearInterval(this.timer);
  }

  launchTimer = () => {
    this.timer = this.interval();
  }

  transformData = (stocks) => {
    const stockValues = stocks.map(stock => Object.values(stock.stocks).map( name => name));
    const nasdaqValues = stockValues.map(num => (num[0]).toString().slice(0, -5));
    const cacValues = stockValues.map(num => (num[1]).toString().slice(0, -5));

    this.setState({
      nasdaq: nasdaqValues,
      cac: cacValues
    })
  }

   render() {
     const { cac, nasdaq } = this.state;
     return (
      <div className='App'>
        <div className='App-header'>
          <h2>CAC40 and NASDAQ stocks</h2>
        </div>
        <StockLineChart className="LineChart" cac={cac} nasdaq={nasdaq} />
        <div className="table">
          <Table cac={cac} nasdaq={nasdaq} onClickHandler={this.stopTimer} onChangeHandler={this.changeStock}/>
        </div>
      </div>
   )
   }
}

export default App;
