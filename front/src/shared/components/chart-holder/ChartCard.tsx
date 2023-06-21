//@ts-nocheck
import { Component } from 'react'
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
    Legend,
);



class ChartCard extends Component<{}, IChartCardState> {


    constructor(props: any) {
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
                    }
                ]
            },
        };
    }

    componentDidMount(): void {

        const chartInfo: IChartInfo = this.initialize();
        this.update(chartInfo);
    }

    initialize(): IChartInfo {
        const options = this.props.options;

        const chartInfo: IChartInfo = ChartInfoExtractor(options);
        options.plugins.title.text = chartInfo.title;
        this.setState(prevState => {
            return {
                labels: (() => {
                    for (let Idx = 0; Idx <= 60; Idx += 5) {
                        prevState.labels.push(Idx.toString());
                    }
                    return prevState.labels;
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
                        }
                    ]
                },
            };
        });
        return chartInfo;
    }

    async update(chartInfo: IChartInfo): Promise<void> {
        const mqttService = new MqttService();
        await mqttService.onMessage((topic, message) => {

            this.setState(prevState => {
                return {
                    labels: (() => {
                        if (prevState.data?.datasets[0].data.length >= prevState.labels.length) {
                            prevState.labels.push(prevState.labels[0])
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
                                    prevState.data?.datasets[0].data.push(JSON.parse(message.toString()).sensor[this.props.label]);
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
                    }
                }
            });
        });
    }

    render() {
        return (
            <>
                <Line options={this.props.options} data={this.state.data} />;
            </>
        )
    }
}


export default ChartCard