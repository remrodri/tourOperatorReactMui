import { describe, it, expect, beforeEach } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import axiosInstance from "../../../config/axiosConfig";
import { createTourType, deleteTourTypeRequest, getAllTourTypes, updateTourTypeRequest } from "../service/tourTypeService";


let mock: AxiosMockAdapter;

describe("Tour Type Service", () => {
  beforeEach(() => {
    mock = new AxiosMockAdapter(axiosInstance);
  });

  it("getAllTourTypes should fetch all tour types", async () => {
    const mockData = {
      statusCode: 200,
      data: [{ id: "1", name: "Adventure" }],
    };
    mock.onGet("/tour-types").reply(200, mockData);

    const result = await getAllTourTypes();
    expect(result).toEqual(mockData);
  });

  it("createTourType should create a new tour type", async () => {
    const mockData = { statusCode: 201, message: "created" };
    const payload = { name: "Adventure", description: "Exciting tours" };
    mock.onPost("/tour-types").reply(201, mockData);

    const result = await createTourType(payload);
    expect(result).toEqual(mockData);
  });

  it("updateTourTypeRequest should update an existing tour type", async () => {
    const mockData = { statusCode: 200, message: "updated" };
    const payload = { name: "Relax", description: "Relaxing tours" };
    mock.onPut("/tour-types/123").reply(200, mockData);

    const result = await updateTourTypeRequest(payload, "123");
    expect(result).toEqual(mockData);
  });

  it("deleteTourTypeRequest should delete a tour type", async () => {
    const mockData = { statusCode: 200, message: "deleted" };
    mock.onDelete("/tour-types/123").reply(200, mockData);

    const result = await deleteTourTypeRequest("123");
    expect(result).toEqual(mockData);
  });
});
