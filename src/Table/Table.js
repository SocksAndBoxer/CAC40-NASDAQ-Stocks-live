import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Table.css';

export default class Table extends Component {

  render() {
    const { cac, nasdaq, onClickHandler } = this.props

    const handleClick = (evt) => {
      evt.preventDefault();
      onClickHandler(evt);
    }

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>CAC40</th>
              {cac.map((value, index) => <td onClick={handleClick} key={index}>{parseFloat(value).toFixed(2)}</td>)}
            </tr>
            <tr>
              <th>NASDAQ</th>
              {nasdaq.map((value, index) => <td onClick={handleClick} key={index}>{parseFloat(value).toFixed(2)}</td>)}
            </tr>
            </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  cac: PropTypes.array.isRequired,
  nasdaq: PropTypes.array.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};
