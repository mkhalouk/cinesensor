import { Component } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartInfoExtractor, IChartInfo } from '../../utils/JsonReader';
import MqttService from '../../../services/MqttService';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartCardProps {
  identifier: string;
  options: any;
}

interface ChartCardState {
  labels: string[];
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      pointBackgroundColor: string;
      pointBorderColor: string;
      pointHoverBackgroundColor: string;
      pointHoverBorderColor: string;
    }[];
  };
}

class ChartCard extends Component<ChartCardProps, ChartCardState> {
  constructor(props: ChartCardProps) {
    super(props);
    this.state = {
      labels: [],
      data: {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            borderColor: `rgb`,
            backgroundColor: `rgba`,
            pointBackgroundColor: `rgb`,
            pointBorderColor: `rgb`,
            pointHoverBackgroundColor: `rgb`,
            pointHoverBorderColor: `rgb$`,
          },
        ],
      },
    };
  }

  componentDidMount(): void {
    const chartInfo: IChartInfo = this.initialize();
    this.update(chartInfo);
  }

  initialize(): IChartInfo {
    const options : any = this.props.identifier;

    const chartInfo: IChartInfo = ChartInfoExtractor(options);
    options.plugins.title.text = chartInfo.title;
    this.setState(() => {
      return {
        labels: (() => {
          const labels: string[] = [];
          for (let Idx = 0; Idx <= 60; Idx += 5) {
            labels.push(Idx.toString());
          }
          return labels;
        })(),
        data: {
          labels: [],
          datasets: [
            {
              label: chartInfo.label,
              data: [],
              borderColor: `rgb${chartInfo.borderColorRGB}`,
              backgroundColor: `rgba${chartInfo.bgColorRGBA}`,
              pointBackgroundColor: `rgb${chartInfo.pointColorRGB}`,
              pointBorderColor: `rgb${chartInfo.pointColorRGB}`,
              pointHoverBackgroundColor: `rgb${chartInfo.pointColorRGB}`,
              pointHoverBorderColor: `rgb${chartInfo.pointColorRGB}`,
            },
          ],
        },
      };
    });
    return chartInfo;
  }

  async update(chartInfo: IChartInfo): Promise<void> {
    const mqttService = new MqttService();
    await mqttService.onMessage((__topic, message) => {
      this.setState((prevState) => {
        return {
          labels: (() => {
            if (prevState.data?.datasets[0].data.length >= prevState.labels.length) {
              prevState.labels.push(prevState.labels[0]);
              prevState.labels.shift();
            }
            return prevState.labels;
          })(),
          data: {
            labels: prevState.labels,
            datasets: [
              {
                label: chartInfo.label,
                data: (() => {
                  if (prevState.data?.datasets[0].data.length >= prevState.labels.length) {
                    prevState.data?.datasets[0].data.shift();
                  }
                  prevState.data?.datasets[0].data.push(
                    JSON.parse(message.toString()).sensor[this.props.identifier]
                  );
                  return prevState.data?.datasets[0].data;
                })(),
                borderColor: `rgb${chartInfo.borderColorRGB}`,
                backgroundColor: `rgba${chartInfo.bgColorRGBA}`,
                pointBackgroundColor: `rgb${chartInfo.pointColorRGB}`,
                pointBorderColor: `rgb${chartInfo.pointColorRGB}`,
                pointHoverBackgroundColor: `rgb${chartInfo.pointColorRGB}`,
                pointHoverBorderColor: `rgb${chartInfo.pointColorRGB}`,
              },
            ],
          },
        };
      });
    });
  }

  render() {
    return (
      <>
        <Line options={this.props.options} data={this.state.data} />
      </>
    );
  }
}

export default ChartCard;
