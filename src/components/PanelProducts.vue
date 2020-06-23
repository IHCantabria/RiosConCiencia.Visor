<template>
  <div class="panel-products">
    <vs-table
      ref="tableProducts"
      :data="products"
      :max-items="tableElements"
      :max-height="tableMaxHeight"
      pagination
      search
    >
      <template slot="thead">
        <vs-th colspan="3" sort-key="selected">
          <div @click="toggleAll">
            <vs-checkbox
              v-model="all"
              class="master-checkbox-products"
              icon="location_searching"
              :color="primaryColor"
            ></vs-checkbox>
          </div>
          <span>Selected</span>
        </vs-th>
        <vs-th sort-key="alias">Product</vs-th>
        <vs-th sort-key="spatialResolution">Spatial Res.</vs-th>
        <vs-th sort-key="temporalResolution">Time Res.</vs-th>
        <vs-th sort-key="sourceName">Source</vs-th>
      </template>
      <template slot-scope="{ data }">
        <vs-tr v-for="(tr, indextr) in data" :key="indextr" :data="tr">
          <vs-td :data="tr.selected">
            <div @click.stop="">
              <vs-checkbox
                v-model="tr.selected"
                icon="location_searching"
                :color="primaryColor"
              ></vs-checkbox>
            </div>
          </vs-td>
          <vs-td>
            <i
              class="fa fa-search"
              @click.stop="
                goToCoords({
                  type: tr.type,
                  coords: tr.extent
                })
              "
            />
          </vs-td>
          <vs-td>
            <dot :size="20" :color="tr.color"></dot>
          </vs-td>
          <vs-td :data="tr.alias">
            {{ tr.alias }}
          </vs-td>
          <vs-td :data="tr.spatialResolution">
            {{ tr.spatialResolution | resolutionLon }}
          </vs-td>
          <vs-td :data="tr.temporalResolution">
            {{ tr.temporalResolution | resolutionHours }}
          </vs-td>
          <vs-td :data="tr.sourceName">
            {{ tr.sourceName }}
          </vs-td>
          <template slot="expand">
            <info-product
              :open-license="tr.licenseOpen"
              :license-type="tr.license"
              :catalog-url="tr.catalogUrl"
              :type-product="tr.productType"
              :source-name="tr.source.longName"
              :source-type="tr.sourceOrigin"
              :source-url="tr.source.urlEntity"
              :variables="tr.variables"
            ></info-product>
          </template>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>
<script>
import BaseSVGDotColor from "@/components/ui/BaseSVGDotColor";
import DataCardProduct from "@/components/ui/DataCardProduct";
import { mapState, mapGetters, mapActions } from "vuex";
import * as types from "@/store/types";
export default {
  components: {
    dot: BaseSVGDotColor,
    "info-product": DataCardProduct
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
      all: false
    };
  },
  computed: {
    ...mapState({
      searchCoords: state => state.coords.searchCoords
    }),
    ...mapGetters({
      products: [types.G_GET_PRODUCTS_SORTED],
      getProductIndex: [types.G_GET_PRODUCT_BY_MAPID]
    })
  },
  watch: {
    products: {
      handler(newValue, oldValue) {
        if (oldValue.length == 0 && newValue.length != 0) this.initProducts();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      goToCoords: types.A_SET_GO_TO_COORDS,
      updateProductsSelected: types.A_UPDATE_PRODUCTS_SELECTED
    }),
    initProducts() {
      this.all = false;
      this.setOrderDefault();
      this.clearExpandedBox();
      this.$nextTick(() => {
        !this.searchCoords.global ? this.selectDefault() : "";
      });
    },
    setOrderDefault() {
      this.$refs.tableProducts.currentSortKey = "spatialResolution";
      this.$refs.tableProducts.currentSortType = "asc";
    },
    selectDefault() {
      this.updateProductsSelected({
        index: this.getProductIndex(this.products[0].mapID),
        value: true
      });
    },
    toggleAll() {
      this.products.forEach(data => {
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
.panel-products {
  width: 100%;
}

.master-checkbox-products {
  margin-right: 10px;
}
</style>
