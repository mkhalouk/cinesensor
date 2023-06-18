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
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import ChartCard from '../ChartCard';
import { ChartInfoExtractor, IChartInfo } from '../../../utils/JsonReader';
import data from '../../../../assets/json/noise-chart-options.json';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const options = data

const chartInfo : IChartInfo = ChartInfoExtractor(options);
options.plugins.title.text = chartInfo.title;

class NoiseChartCard extends ChartCard {

    constructor(props: any) {
        super(props);
        this.state = {
            labels: [],
            data: {
                labels: [],
                datasets: [
                    {
                        label: chartInfo.label,
                        data: [faker.number.int({ min: 0, max: 100 })],
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
    }

    

    componentDidMount(): void {
        super.initialize()
        super.update(chartInfo);


    }

    render() {
        return (
            <>
                <Line options={options} data={this.state.data} />;
            </>
        )
    }
}


export default NoiseChartCard