import { defineStore } from "pinia";
import { spinnerConfig, spinnerEnums } from "@/config/spinner-config";

export const useSpinnerStore = defineStore("spinnerStore", {
  state: () => {
    return {
      mlActive: false,
      calls: 0,
      spinnerConfig: spinnerConfig,
      spinnerEnums: spinnerEnums,
    };
  },
  getters: {
    mlTasksConfig() {
      return this.spinnerConfig?.tasksConfig || null;
    },
  },
  actions: {
    show() {
      this.calls++;
      this.mlActive = true;
    },
    hide() {
      this.calls--;
      if (this.calls == 0) {
        this.mlActive = false;
      }
      if (this.calls == 0) this._clearTasks();
    },
    configureModeSpinner() {
      this.spinnerConfig.mode = this.spinnerEnums.ModesSpinner.progress;
    },
    addTask(name, text) {
      this.spinnerConfig.tasksConfig.tasks.push({
        id: this.spinnerConfig.tasksConfig.tasks.length + 1,
        name,
        text,
        status: this.spinnerEnums.statusTask.pending,
      });
    },
    updateTask(name, status = null, text = null) {
      const indexTask = this.spinnerConfig.tasksConfig.tasks.findIndex(
        (task) => task.name === name,
      );
      if (status) {
        this.spinnerConfig.tasksConfig.tasks[indexTask].status = status;
      }
      if (text) {
        this.spinnerConfig.tasksConfig.tasks[indexTask].text = text;
      }
    },
    _clearTasks() {
      this.spinnerConfig.tasksConfig.tasks = [];
    },
  },
});
