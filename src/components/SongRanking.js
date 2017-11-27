import React from 'react';
import { Line } from 'react-chartjs-2';

const SongRanking = (props) => {

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    reverse: true,
                    min: 1
                }
            }]
        }
    };

    let labels = [];
    props.rankings.forEach((ranking) => { labels.push(ranking.date); });

    let ranks = [];
    props.rankings.forEach((ranking) => { ranks.push(ranking.rank); });
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
                <Line data={data} options={options} height={75} />
            </div>
        </div>
    );
};

export default SongRanking;