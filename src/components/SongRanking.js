import React from 'react';
import { Line } from 'react-chartjs-2';

/**
 * SongRanking component shows a chart with historical ranks of a song
 */
export default class SongRanking extends React.Component {

  render() {
    let rankings = this.props.rankings;

    let labels = [];
    rankings.forEach((ranking) => { labels.push(ranking.date); });

    let ranks = [];
    rankings.forEach((ranking) => { ranks.push(ranking.rank); });

    const chartOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              reverse: true,
              min: 1
            }
          }
        ]
      }
    };

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Rank',
          data: ranks,
          backgroundColor: "rgba(153,255,51,0)",
          borderColor: "rgba(0,220,0,1)",
          hoverRadius: 8,
          borderWidth: 4,
          radius: 2
        }
      ]
    };

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Ranking History</h3>
        </div>
        <div className="panel-body">
          <Line data={data} options={chartOptions} height={75} />
        </div>
      </div>
    );
  }
}