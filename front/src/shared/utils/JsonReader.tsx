function readFormElements(_jsonObject: any, createElement: (data: any) => any): JSX.Element[] {
  let _elementsToRender : any[] = [];
  if (_jsonObject != undefined) {
    if (["OBJECT", "STACK", "COLUMN", "R0W"].includes(_jsonObject.type.toUpperCase())) {
      _jsonObject.children.map((child: any) => {
        _elementsToRender.push(createElement(child));
      });
    }
  }
  return _elementsToRender;
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
      title: (() => `${_jsonObject.label} readings for today : ${new Date(Date.now()).toLocaleDateString()}`)(),
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