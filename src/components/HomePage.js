import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Chart from './Chart';
import MusicAPI from '../api/mtm.js';

import 'react-datepicker/dist/react-datepicker.css';

/**
 * HomePage component shows the date picker that renders the ordered list of songs.
 */
const dateFormat = "YYYY-MM-DD";

export default class HomePage extends React.Component {

  // Initial state
  state = {
    songs: undefined,
    date: moment('2014-02-01'),
    isLoading: false
  };

  /**
   * Retrieves a chart based on the input date
   * @param {string} date 
   */
  loadChart(date) {
    MusicAPI.getChart(date).then(function (data) {
      this.setState({
        songs: data,
        isLoading: false
      });
    }.bind(this), function (e) {
      this.setState({
        isLoading: false
      });

      alert(e.message);
    }.bind(this));
  };

  /**
   * Handles change in date text box
   */
  handleOnDateChange = (dateString) => {
    var newDate = moment(dateString, dateFormat);
    this.setState({
      date: newDate
    });
  };

  /**
   * Handles click on Go button
   */
  handleGoAction = (e) => {
    e.preventDefault();

    this.setState({
      isLoading: true
    });

    if (!this.state.date.isValid()) {
      alert("Invalid date");
      return;
    }

    this.loadChart(this.state.date.format(dateFormat));
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <img src="/images/logo.png" />

            <div className="container">
              <div className="row">
                <div className='col-sm-4 col-centered text-centered'>
                  <h4>Where do you want to go?</h4>
                </div>
              </div>
              <div className="row">
                <div className='col-sm-4 col-centered'>
                  <div className="form-group">
                    <div className="row">
                      <form onSubmit={this.handleGoAction}>
                        <div className="col-sm-8">
                          <DatePicker
                            id="date"
                            selected={this.state.date}
                            shouldCloseOnSelect={true}
                            dateFormat="YYYY-MM-DD"
                            minDate={moment('2014-02-01')}
                            maxDate={moment('2014-02-28')}
                            onChange={this.handleOnDateChange}
                            readOnly={true}
                            className="form-control" />
                        </div>
                        <div className="col-sm-4">
                          <button type="submit" className="btn btn-success">Go!</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {this.state.isLoading && <p>Loading...</p>}
              {this.state.songs != undefined && (<Chart songs={this.state.songs} />)}

            </div>

          </div>
        </div>
      </div>
    );
  }
};
