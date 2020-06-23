export const spinnerEnums = {
  statusTask: Object.freeze({ pending: 1, failed: 2, completed: 3 }),
  ModesSpinner: Object.freeze({ basic: 1, progress: 2, subTasks: 3 })
};

export const spinnerConfig = {
  title: "Loading",
  text: "Preparing data. Please, wait...",
  mode: spinnerEnums.ModesSpinner.basic, //Enum Modes: basic, progress, subTasks.
  color: "#1c313a",
  tasksConfig: {
    loadingBar: false,
    tasks: []
  }
  //{loadingBar: boolean, tasks: [{id: number, name:"text", text: "text",status: enum ModesSpinner}]
};
