
function readWidgetElements(_jsonObject: any, createElement: (data: any, __callback?: () => void) => any): JSX.Element[] {
  let _elementsToRender: any[] = [];
  if (_jsonObject != undefined) {
    if (["OBJECT", "STACK", "COLUMN", "R0W"].includes(_jsonObject.type.toUpperCase())) {
      _jsonObject.children.map((child: any) => {
        const styledChild = setLayoutStyle(child, _jsonObject.type.toUpperCase())
        _elementsToRender.push(createElement(styledChild));
      });
    }
  }
  return _elementsToRender;
}

function setLayoutStyle(child: any, layout: string) : any{
  switch (layout) {
    case "COLUMN":
      child.style.display = "grid";
      break;
    case "ROW":
      child.style.display = "inline-block";
      break;
  }
  return child;
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

function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}


export type IChartInfo = {
  title: string;
  label: string;
  bgColorRGBA: string;
  borderColorRGB: string;
  pointColorRGB: string;
}

export { readWidgetElements, ChartInfoExtractor, isJsonString }