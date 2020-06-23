import {
  parseGeoJSON,
  colorLayers,
  mapIDGenerator,
  licenseProductType,
  licenseBuoyType,
  licenseStationType
} from "@/utils/data-operator-utils.js";
import { mapGetters } from "vuex";
import * as types from "@/store/types";
import * as config from "@/config/data-config";
export const dataHelperMixin = {
  computed: {
    ...mapGetters({
      getSourceName: [types.G_GET_SOURCE_NAMESHORT],
      getSourceType: [types.G_GET_SOURCE_TYPE],
      getBuoyTypeName: [types.G_GET_BUOYTYPE_NAME]
    })
  },
  methods: {
    formatProducts(data) {
      return data
        .filter(data => data.active)
        .map(data => {
          return {
            id: data.id,
            mapID: mapIDGenerator(data.id, config.PRODUCTS.id),
            selected: false,
            type: config.PRODUCTS.type,
            alias: data.alias,
            sourceName: data.source.alias,
            source: data.source,
            sourceOrigin: this.getSourceType(data.source.id),
            extent: parseGeoJSON(data.extent),
            variables: data.variables,
            productType: data.type,
            license: data.license,
            licenseOpen: licenseProductType(data.license),
            color: colorLayers(),
            temporalResolution: data.timeResolution
              ? parseFloat(data.timeResolution)
              : "",
            spatialResolution: data.spatialResLonKm,
            catalogUrl: `${data.urlBase}${data.catalog}`
          };
        });
    },
    formatSources(data) {
      return data.map(data => {
        return {
          id: data.id,
          nameLong: data.nameLong ? data.nameLong : "",
          nameShort: data.nameShort ? data.nameShort : "",
          urlEntity: data.urlEntity ? data.urlEntity : "",
          sourceType: data.sourceType ? data.sourceType : ""
        };
      });
    },
    formatBuoys(data) {
      return data.map(data => {
        return {
          id: data.id,
          mapID: mapIDGenerator(data.id, config.BUOYS.id),
          selected: false,
          name: data.name,
          type: config.BUOYS.type,
          typeSensor: config.BUOYS.typeSensor,
          subTypeSensors: this.getBuoyTypeName(data.buoyTypeId),
          distance: data.distance ? data.distance : 0,
          latitude: data.latitude ? data.latitude : 0,
          longitude: data.longitude ? data.longitude : 0,
          license:
            this.getBuoyTypeName(data.buoyTypeId) == "Restringida"
              ? "Restricted Access"
              : "Open Access",
          licenseOpen: licenseBuoyType(this.getBuoyTypeName(data.buoyTypeId)),
          variables: data.variable,
          color: config.BUOYS.color
        };
      });
    },
    formatStations(data) {
      return data
        .filter(data => data.active)
        .map(data => {
          return {
            id: data.code,
            mapID: mapIDGenerator(data.code, config.STATIONS.id),
            selected: false,
            name: data.name,
            type: config.STATIONS.type,
            typeSensor: config.STATIONS.typeSensor,
            subTypeSensors: data.stationType.name,
            distance: data.distance ? data.distance : 0,
            height: data.height ? data.height : 0,
            latitude: data.latitude ? data.latitude : 0,
            longitude: data.longitude ? data.longitude : 0,
            placeName: data.placeName ? data.placeName : "",
            project: data.project ? data.project.name : "",
            color: config.STATIONS.color,
            variables: [],
            license: "Open Access",
            licenseOpen: licenseStationType("Open Access")
          };
        });
    },
    formatProductMoments(data) {
      return data
        .filter(
          d =>
            config.TIMELINE_MOMENTS.filter(moment => moment.id == d.id).length >
            0
        )
        .map(data => {
          let configMoment = config.TIMELINE_MOMENTS.find(d => d.id == data.id);
          return {
            id: data.id,
            label: configMoment.label,
            icon: configMoment.icon,
            name: data.moment,
            color: configMoment.color
          };
        });
    },
    formatProductVariableTypes(data, additionalInfo) {
      return data.map(data => {
        return {
          id: data.id,
          name: data.name,
          momentId: additionalInfo.momentId
        };
      });
    }
  }
};
