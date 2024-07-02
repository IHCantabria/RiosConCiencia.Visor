const CONTEXT_MENU_CONFIG = {
  behaviors: [
    {
      id: "Reload",
      enabled: "none",
    },
    // {
    //   id: "DownloadPDF",
    //   enabled: "none",
    // },
    {
      id: "DownloadXLS",
      enabled: "none",
    },
    {
      id: "ViewSource",
      enabled: "none",
    },
    {
      id: "Print",
      enabled: "none",
    },
    {
      id: "ShowGuide",
      enabled: "none",
    },
    {
      id: "HideGuide",
      enabled: "none",
    },
    {
      id: "ViewDataTable",
      enabled: "none",
    },
    {
      id: "SaveAsImagePNG ",
      enabled: "none",
    },
  ],
};

export const HISTORIC_CHARTS_CONFIG = {
  type: "line",
  title: {
    text: "",
    "font-size": "18px",
    "font-weight": "normal",
    "adjust-layout": true,
    "background-color": "#6b8b98",
    "font-color": "white",
    "border-radius": "5px",
    width: "100%",
    padding: "3px 10px",
    // textAlign: "left",
  },
  plotarea: {
    margin: "dynamic 100 100 dynamic",
  },
  scaleX: {
    item: {
      //   fontAngle: 45,
      fontSize: "12px",
      offsetX: "0px",
      offsetY: "10px",
      color: "black",
    },
  },
  scaleY: {
    guide: {
      visible: false,
    },
    item: {
      fontColor: "black",
    },
  },
  crosshairX: {
    "line-color": "#efefef",
    "plot-label": {
      "border-radius": "5px",
      "border-width": "1px",
      "border-color": "#f6f7f8",
      padding: "10px",
      "font-weight": "bold",
    },
    "scale-label": {
      "font-color": "#000",
      "background-color": "#f6f7f8",
      "border-radius": "5px",
    },
  },
  tooltip: {
    visible: false,
  },
  gui: CONTEXT_MENU_CONFIG,
  series: [],
};

export const SERIES_CONFIG = {
  values: [],
  text: "",
  "line-color": "#007790",
  "legend-item": {
    "background-color": "#007790",
    borderRadius: 10,
    "font-color": "white",
  },
  "legend-marker": {
    visible: false,
  },
  marker: {
    "background-color": "#007790",
    "border-width": 0,
    shadow: 0,
  },
};
