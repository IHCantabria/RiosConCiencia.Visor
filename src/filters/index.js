import Vue from "vue";
import { resolutionLon, resolutionHours } from "./filters";

Vue.filter("resolutionLon", resolutionLon);
Vue.filter("resolutionHours", resolutionHours);
