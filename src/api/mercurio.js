import { MERCURIO_API } from "@/config/data-providers.js";
export const getAllSources = () => {
  const url = `${MERCURIO_API.public}/Sources`;
  const params = {
    "Access-Control-Allow-Origin": "*"
  };
  return { url, params };
};
export const getAllProductMoments = () => {
  const url = `${MERCURIO_API.public}/ProductMoments`;
  const params = {
    "Access-Control-Allow-Origin": "*"
  };
  return { url, params };
};
export const getAllProducts = () => {
  const url = `${MERCURIO_API.private}/DataMap/Products`;
  const params = {
    "Access-Control-Allow-Origin": "*"
  };
  return { url, params };
};
export const getProductsByCoords = coords => {
  const url = `${MERCURIO_API.private}/DataMap/Products?xMin=${coords.xMin}&yMin=${coords.yMin}&xMax=${coords.xMax}&yMax=${coords.yMax}`;
  const params = {
    "Access-Control-Allow-Origin": "*"
  };
  return { url, params };
};
export const getProductsByTypes = variable => {
  const url = `${MERCURIO_API.private}/DataMap/Products?productMomentId=${variable.momentId}&variableTypeId=${variable.id}`;
  const params = {
    "Access-Control-Allow-Origin": "*"
  };
  return { url, params };
};
export const getProductsByCoordsAndTypes = (coords, variable) => {
  const url = `${MERCURIO_API.private}/DataMap/Products?productMomentId=${variable.momentId}&variableTypeId=${variable.id}&xMin=${coords.xMin}&yMin=${coords.yMin}&xMax=${coords.xMax}&yMax=${coords.yMax}`;
  const params = {
    "Access-Control-Allow-Origin": "*"
  };
  return { url, params };
};

export const getVariableTypesByProductMomentId = productMomentId => {
  const url = `${MERCURIO_API.public}/ProductMoments/${productMomentId}/VariableTypes`;
  const params = {
    "Access-Control-Allow-Origin": "*"
  };
  return { url, params };
};
