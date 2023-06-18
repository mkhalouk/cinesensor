function readFormElements(_jsonObject: any, createElement: (data: any) => any): string {
  let _stringToRender = '';
  if (_jsonObject != undefined) {
    if (_jsonObject.type.toUpperCase() === "OBJECT") {
      _jsonObject.children.map((child: any) => {
        _stringToRender += createElement(child);
      });
    }
  }
  return _stringToRender;
}

function ChartInfoExtractor(_jsonObject: any): IChartInfo {
  let chartArgs: IChartInfo = {
    title: "",
    label: "",
    bgColorRGBA: "",
    borderColorRGB: "",
    pointColorRGB: "",
  };

  if (_jsonObject != undefined) {
    chartArgs = {
      title: (() => `Temperature readings for today : ${new Date(Date.now()).toLocaleDateString()}`)(),
      label: _jsonObject.label,
      bgColorRGBA: _jsonObject.bgColorRGBA,
      borderColorRGB: _jsonObject.borderColorRGB,
      pointColorRGB: _jsonObject.pointColorRGB,
    }
  }
  return chartArgs;
}



export type IChartInfo = {
  title: string;
  label: string;
  bgColorRGBA: string;
  borderColorRGB: string;
  pointColorRGB: string;
}

export { readFormElements, ChartInfoExtractor }