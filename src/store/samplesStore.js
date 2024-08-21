import { defineStore } from "pinia";
import {
  getYears,
  getCampaignFilter,
  getDownloadFilters,
} from "@/utils/data-operator-utils.js";
import { CAMPAIGN_VALUES } from "@/config/data-config";
import { ADMIN_ROLE_ID } from "@/config/role-config.js";
import { shallowRef } from "vue";

export const useSamplesStore = defineStore("samplesStore", {
  state: () => {
    return {
      samples: null,
      samplesPicts: null,
      yearOptions: [],
      yearFilter: {},
      campaignOptions: [],
      campaignFilter: {},
      downloadOptions: [],
      downloadFilters: [],
      user: null,
      riverSectionHistoricData: {
        active: false,
        riverSectionId: null,
      },
      riversGeoJson: shallowRef(null),
    };
  },
  getters: {
    getSamplesFiltered() {
      return this.samples
        ? this.samples.filter(
            (sample) =>
              sample.year == this.yearFilter.name &&
              sample.idCampaign == this.campaignFilter.id,
          )
        : [];
    },
    getSamplesFilteredDownloadIds() {
      if (!this.samples) {
        return [];
      } else if (
        !this.downloadFilters.length ||
        (this.downloadFilters.length == 1 && this.downloadFilters[0].id == 0)
      ) {
        return this.samples.map((sample) => sample.id);
      } else {
        return this.samples
          .filter((sample) => this.getFiltersIds.includes(sample.idFilter))
          .map((sample) => sample.id);
      }
    },
    getSamplesPictsFilteredDownloadIds() {
      if (!this.samplesPicts) {
        return [];
      } else if (
        !this.downloadFilters.length ||
        (this.downloadFilters.length == 1 && this.downloadFilters[0].id == 0)
      ) {
        return this.samplesPicts.map((sample) => sample.id);
      } else {
        return this.samplesPicts
          .filter((sample) => this.getFiltersIds.includes(sample.idFilter))
          .map((sample) => sample.id);
      }
    },
    getFiltersIds() {
      return this.downloadFilters.length
        ? this.downloadFilters.map((filter) => filter.id)
        : [];
    },
    getIsFilterAll() {
      return this.downloadFilters[0].id == 0;
    },
    getUserToken() {
      return this.user ? this.user.token : "";
    },
    getUserLogged() {
      return this.user;
    },
    getAdminLogged() {
      return this.user && this.user.roleId == ADMIN_ROLE_ID;
    },
    getSamplesLoaded() {
      return this.samples;
    },
  },
  actions: {
    setSamples(operation) {
      if (!operation) return;
      this.samples = operation;
      const years = getYears(operation);
      const filterCampaign = getCampaignFilter(
        operation,
        years[0],
        CAMPAIGN_VALUES,
      );
      this.yearOptions = years;
      this.yearFilter = years[0];
      this.campaignOptions = CAMPAIGN_VALUES;
      this.campaignFilter = filterCampaign;
      const downloadOptions = getDownloadFilters(years, CAMPAIGN_VALUES);
      this.downloadOptions = downloadOptions;
      this.downloadFilters = [downloadOptions[0]];
    },
    setPictsSamples(operation) {
      this.samplesPicts = operation;
    },
    setRiversGeoJson(operation) {
      this.riversGeoJson = operation;
    },
    setUser(operation) {
      this.user = operation;
    },
    setSampleCampaignFilter(operation) {
      this.campaignFilter = operation;
    },
    setSampleYearFilter(operation) {
      this.yearFilter = operation;
    },
    setSampleDownloadFilters(operation) {
      this.downloadFilters = operation;
    },
    async fetchSamplesAdmin(operation) {
      this.setSamplesAdmin(operation);
    },
    async fetchSamples(operation) {
      this.setSamples(operation);
    },
    async fetchPictsSamples(operation) {
      this.setPictsSamples(operation);
    },
    async fetchUser(operation) {
      this.setUser(operation);
    },
    async setSampleCampaignFilterAction(operation) {
      this.setSampleCampaignFilter(operation);
    },
    async setSampleYearFilterAction(operation) {
      this.setSampleYearFilter(operation);
    },
    async setSampleDownloadFiltersAction(operation) {
      this.setSampleDownloadFilters(operation);
    },
    setRiverSectionHistoricData(idRiverSection) {
      if (!idRiverSection) {
        this.riverSectionHistoricData.active = false;
        this.riverSectionHistoricData.riverSectionId = null;
        return;
      }
      this.riverSectionHistoricData.active = true;
      this.riverSectionHistoricData.riverSectionId = idRiverSection;
    },
  },
});
