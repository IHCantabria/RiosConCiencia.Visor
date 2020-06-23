import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import coords from "@/store/modules/coords";
import { cloneDeep } from "lodash";
import * as types from "@/store/types";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("store/modules/coords.js", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        coords: cloneDeep(coords)
      }
    });
  });
  //UNIT TESTS
  it("add SearchCoords to state when A_SET_SEARCH_COORDS is dispatched", () => {
    expect.assertions(2);
    expect(store.state.coords.searchCoords).toBeNull();
    store.dispatch(types.A_SET_SEARCH_COORDS, {
      xmin: 10,
      xmax: 20,
      ymin: -34,
      ymax: 34
    });
    expect(store.state.coords.searchCoords).toStrictEqual({
      xmin: 10,
      xmax: 20,
      ymin: -34,
      ymax: 34
    });
  });
  it("add SearchCoords to searchCoords state when M_SET_SEARCH_COORDS is commited", () => {
    expect.assertions(2);
    expect(store.state.coords.searchCoords).toBeNull();
    store.commit(types.M_SET_SEARCH_COORDS, {
      searchCoords: {
        xmin: 10,
        xmax: 20,
        ymin: -34,
        ymax: 34
      }
    });
    expect(store.state.coords.searchCoords).toStrictEqual({
      xmin: 10,
      xmax: 20,
      ymin: -34,
      ymax: 34
    });
  });
  it("add GoToCoords to state when A_SET_GO_TO_COORDS is dispatched", () => {
    expect.assertions(2);
    expect(store.state.coords.goToCoords).toBeNull();
    store.dispatch(types.A_SET_GO_TO_COORDS, {
      xmin: 10,
      xmax: 20,
      ymin: -34,
      ymax: 34
    });
    expect(store.state.coords.goToCoords).toStrictEqual({
      xmin: 10,
      xmax: 20,
      ymin: -34,
      ymax: 34
    });
  });
  it("add GoToCoords to GoToCoords state when M_SET_GO_TO_COORDS is commited", () => {
    expect.assertions(2);
    expect(store.state.coords.goToCoords).toBeNull();
    store.commit(types.M_SET_GO_TO_COORDS, {
      goToCoords: {
        xmin: 10,
        xmax: 20,
        ymin: -34,
        ymax: 34
      }
    });
    expect(store.state.coords.goToCoords).toStrictEqual({
      xmin: 10,
      xmax: 20,
      ymin: -34,
      ymax: 34
    });
  });
});
