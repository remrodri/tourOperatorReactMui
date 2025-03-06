import axiosInstance from "../../../config/axiosConfig";


export const deleteTouristDestinationRequest = async (id: string) => {
  const response = await axiosInstance.delete(`/tourist-destination/${id}`);
  return response.data;
};

export const getAllTouristDestinationRequest = async () => {
  const response = await axiosInstance.get("/tourist-destination");
  return response.data;
};

export const updateTouristDestinationRequest = async (data: {
  id?: string;
  name: string;
  description: string;
  newImages: File[];
  existingImages: string[];
}) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);

  if (data.newImages.length > 0) {
    data.newImages.forEach((image) => {
      formData.append("newImages", image);
    });
  }

  formData.append("existingImages", JSON.stringify(data.existingImages));

  const response = await axiosInstance.put(
    `/tourist-destination/${data.id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  // console.log("data::: ", data);
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
