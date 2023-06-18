interface IChartCardState {
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
        }[]
    };
}