import axiosInstance from "../../../../config/axiosConfig";

export const getAllTouristDestinationRequest = async () => {
  const response = await axiosInstance.get("/tourist-destination");
  return response.data;
};

export const createTouristDestinationRequest = async (data: {
  // id?: string;
  name: string;
  description: string;
  newImages: File[];
  // existingImages: string[];
}) => {
  // console.log('data::: ', data);
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  data.newImages.forEach((image) => {
    formData.append("newImages", image);
  });
  const response = await axiosInstance.post("/tourist-destination", formData, {
    // params: { name: data.name },
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
