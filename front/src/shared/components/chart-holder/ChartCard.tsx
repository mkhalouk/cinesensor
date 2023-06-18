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
import { faker } from '@faker-js/faker';
import { IChartInfo } from '../../utils/JsonReader';


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
    }

    initialize(): void {
        this.setState(prevState => {
            return {
                labels: (() => {
                    for (let Idx = 0; Idx <= 60; Idx += 5) {
                        prevState.labels.push(Idx.toString());
                    }
                    return prevState.labels;
                })()
            };
        });
    }

    update(chartInfo : IChartInfo): number {
        return setInterval(() => {
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
                                    prevState.data?.datasets[0].data.push(faker.number.int({ min: 0, max: 100 }));
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
        }, 5000);
    }

    render() {
        return (
            <>
            </>
        )
    }
}


export default ChartCard