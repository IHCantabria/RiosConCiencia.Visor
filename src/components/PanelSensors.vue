<template>
  <div class="panel-sensors">
    <vs-table
      ref="tableSensors"
      :data="sensors"
      :max-items="tableElements"
      :max-height="tableMaxHeight"
      pagination
      search
    >
      <template slot="thead">
        <vs-th sort-key="subTypeSensors">Sensor SubType</vs-th>
        <vs-th sort-key="typeSensor">Sensor Type</vs-th>
        <vs-th sort-key="name">Sensor</vs-th>
        <vs-th colspan="2" sort-key="selected">
          <span>Selected</span>
          <div @click="toggleAll">
            <vs-checkbox
              v-model="all"
              class="master-checkbox-sensors"
              icon="location_searching"
              :color="primaryColor"
            ></vs-checkbox>
          </div>
        </vs-th>
      </template>
      <template slot-scope="{ data }">
        <vs-tr v-for="(tr, indextr) in data" :key="indextr" :data="tr">
          <vs-td :data="tr.subTypeSensors">
            {{ tr.subTypeSensors }}
          </vs-td>
          <vs-td :data="tr.typeSensor">
            {{ tr.typeSensor }}
          </vs-td>
          <vs-td :data="tr.name">
            {{ tr.name }}
          </vs-td>
          <vs-td>
            <i
              class="fa fa-search"
              @click.stop="
                goToCoords({
                  type: tr.type,
                  coords: { lat: tr.latitude, lon: tr.longitude }
                })
              "
            />
          </vs-td>
          <vs-td :data="tr.selected">
            <div @click.stop="">
              <vs-checkbox
                v-model="tr.selected"
                icon="location_searching"
                :color="primaryColor"
              ></vs-checkbox>
            </div>
          </vs-td>
          <template slot="expand">
            <info-buoy
              v-if="tr.typeSensor == BUOYS.typeSensor"
              :open-license="tr.licenseOpen"
              :license-type="tr.license"
              :latitude="tr.latitude"
              :longitude="tr.longitude"
              :variables="tr.variables"
            ></info-buoy>
            <info-station
              v-else
              :open-license="tr.licenseOpen"
              :license-type="tr.license"
              :latitude="tr.latitude"
              :longitude="tr.longitude"
              :height="tr.height"
              :proyect-name="tr.project"
              :location="tr.placeName"
              :variables="tr.variables"
            ></info-station>
          </template>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { BUOYS } from "@/config/data-config";
import * as types from "@/store/types";
export default {
  components: {
    "info-buoy": () => import("@/components/ui/DataCardBuoy"),
    "info-station": () => import("@/components/ui/DataCardStation")
  },
  props: {
    tableElements: {
      type: Number,
      required: false,
      default: () => {
        return 15;
      }
    },
    tableMaxHeight: {
      type: String,
      required: false,
      default: () => {
        return "200px";
      }
    }
  },
  data() {
    return {
      all: false,
      BUOYS
    };
  },
  computed: {
    ...mapState({
      searchCoords: state => state.coords.searchCoords
    }),
    ...mapGetters({
      sensors: [types.G_GET_SENSORS_SORTED]
    })
  },
  watch: {
    sensors: {
      handler(newValue, oldValue) {
        if (oldValue.length == 0 && newValue.length != 0) this.initSensors();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      goToCoords: types.A_SET_GO_TO_COORDS
    }),
    initSensors() {
      this.all = false;
      this.setOrderDefault();
      this.clearExpandedBox();
      this.$nextTick(() => {
        !this.searchCoords.global ? this.selectDefault() : "";
      });
    },
    setOrderDefault() {
      this.$refs.tableSensors.currentSortKey = "distance";
      this.$refs.tableSensors.currentSortType = "asc";
    },
    selectDefault() {
      this.toggleAll();
      this.all = true;
    },
    toggleAll() {
      this.sensors.forEach(data => {
        data.selected = this.all ? false : true;
      });
    },
    clearExpandedBox() {
      while (document.getElementsByClassName("tr-expand").length > 0) {
        const element = document.getElementsByClassName("tr-expand")[0];
        element.remove();
      }
    }
  }
};
</script>
<style scoped lang="scss">
.panel-sensors {
  width: 100%;
}

.master-checkbox-sensors {
  margin-left: 10px;
}
</style>
