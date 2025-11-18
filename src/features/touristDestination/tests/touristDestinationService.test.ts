import { describe, it, expect, beforeEach } from "vitest";
import axiosInstance from "../../../config/axiosConfig";
import AxiosMockAdapter from "axios-mock-adapter";
import {
  createTouristDestinationRequest,
  deleteTouristDestinationRequest,
  getAllTouristDestinationRequest,
  updateTouristDestinationRequest,
} from "../service/touristDestinationService";


let mock: AxiosMockAdapter;

describe("Tourist Destination Service", () => {
  beforeEach(() => {
    mock = new AxiosMockAdapter(axiosInstance);
  });

  it("getAllTouristDestinationRequest should fetch all destinations", async () => {
    const mockData = { statusCode: 200, data: [{ id: "1", name: "Beach" }] };
    mock.onGet("/tourist-destination").reply(200, mockData);

    const result = await getAllTouristDestinationRequest();
    expect(result).toEqual(mockData);
  });

  it("deleteTouristDestinationRequest should delete a destination", async () => {
    const mockData = { statusCode: 200, message: "deleted" };
    mock.onDelete("/tourist-destination/123").reply(200, mockData);

    const result = await deleteTouristDestinationRequest("123");
    expect(result).toEqual(mockData);
  });

  it("updateTouristDestinationRequest should send FormData and update destination", async () => {
    const mockData = { statusCode: 200, message: "updated" };
    mock.onPut("/tourist-destination/123").reply(200, mockData);

    const fakeFile = new File(["content"], "image.jpg", { type: "image/jpeg" });
    const result = await updateTouristDestinationRequest({
      id: "123",
      name: "Mountain",
      description: "Beautiful mountain",
      newImages: [fakeFile],
      existingImages: ["old.jpg"],
    });

    expect(result).toEqual(mockData);
  });

  it("createTouristDestinationRequest should send FormData and create destination", async () => {
    const mockData = { statusCode: 201, message: "created" };
    mock.onPost("/tourist-destination").reply(201, mockData);

    const fakeFile = new File(["content"], "image.jpg", { type: "image/jpeg" });
    const result = await createTouristDestinationRequest({
      name: "Lake",
      description: "Beautiful lake",
      newImages: [fakeFile],
    });

    expect(result).toEqual(mockData);
  });
});
