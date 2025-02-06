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
  // console.log("tourTypeData::: ", tourTypeData);
  try {
    const response = await axiosInstance.post("/tour-types", tourTypeData);
    // console.log("response::: ", response);
    return response.data;
  } catch (error) {
    console.log("Error al crear el tipo de tour::: ", error);
  }
};

export const updateTourTypeRequest = async (
  tourTypeData: { name: string; description: string },
  id: string
) => {
  // console.log("tourTypeData::: ", tourTypeData);
  const data = {
    name: tourTypeData.name,
    description: tourTypeData.description,
  };
  const response = await axiosInstance.put(`/tour-types/${id}`, data);
  // console.log("response::: ", response);
  return response.data;
};

export const deleteTourTypeRequest = async (tourTypeId: string) => {
  // console.log("tourTypeId::: ", tourTypeId);
  const response = await axiosInstance.delete(`/tour-types/${tourTypeId}`);
  return response.data;
};
