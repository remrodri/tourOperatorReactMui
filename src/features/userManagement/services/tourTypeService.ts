import axiosInstance from "../../../config/axiosConfig";

export const getAllTourTypes = async () => {
  try {
    const response = await axiosInstance.get("/tour-types");
    console.log("response::: ", response);
    return response.data;
  } catch (error) {
    console.log("Error al obtener los tipos de tour::: ", error);
  }
};

export const createTourType = async (tourTypeData: any) => {
  console.log('tourTypeData::: ', tourTypeData);
  try {
    const response = await axiosInstance.post("/tour-types", tourTypeData);
    // console.log("response::: ", response);
    return response.data;
  } catch (error) {
    console.log("Error al crear el tipo de tour::: ", error);
  }
};
