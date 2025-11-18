import { describe, it, expect, beforeEach } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import axiosInstance from "../../../config/axiosConfig";
import { getAllTourPackagesRequest, createTourPackageRequest, updateTourPackageRequest, deleteTourPackageRequest, updateTourPackageStatusRequest } from '../service/TourPackageService';
import { TourPackageType } from "../types/TourPackageType";


let mock: AxiosMockAdapter;

describe("Tour Package Service", () => {
  beforeEach(() => {
    mock = new AxiosMockAdapter(axiosInstance);
  });

  it("getAllTourPackagesRequest should fetch all tour packages", async () => {
    const mockData = {
      statusCode: 200,
      data: [{ id: "1", name: "Adventure" }],
    };
    mock.onGet("/tour-package").reply(200, mockData);

    const result = await getAllTourPackagesRequest();
    expect(result).toEqual(mockData);
  });

  it("getTourPackageByIdRequest should fetch a specific tour package", async () => {
    const mockData = {
      statusCode: 200,
      data: { id: "123", name: "Beach Trip" },
    };
    mock.onGet("/tour-package/123").reply(200, mockData);

    const result = await getAllTourPackagesRequest();
    expect(result).toEqual(mockData);
  });

  it("createTourPackageRequest should create a new tour package", async () => {
    const mockData = { statusCode: 201, message: "created" };
    mock.onPost("/tour-package").reply(201, mockData);

    const result = await createTourPackageRequest({
      name: "Mountain Adventure",
      tourType: "123456",
      touristDestination: "1234567",
      duration: 2,
      dateRanges: [],
      price: 500,
      activities: [],
      // itinerary: days[],
      status:"active"
      
    });

    expect(result).toEqual(mockData);
  });

  it("updateTourPackageRequest should update an existing tour package", async () => {
    const mockData = { statusCode: 200, message: "updated" };
    mock.onPut("/tour-package/123").reply(200, mockData);

    const result = await updateTourPackageRequest({
      id: "123",
      name: "Updated Adventure",
    });

    expect(result).toEqual(mockData);
  });

  it("deleteTourPackageRequest should delete a tour package", async () => {
    const mockData = { statusCode: 200, message: "deleted" };
    mock.onDelete("/tour-package/123").reply(200, mockData);

    const result = await deleteTourPackageRequest("123");
    expect(result).toEqual(mockData);
  });

  it("updateTourPackageStatusRequest should update the status of a tour package", async () => {
    const mockData = { statusCode: 200, message: "status updated" };
    mock.onPut("/tour-package-status/123").reply(200, mockData);

    const result = await updateTourPackageStatusRequest("123", "active");
    expect(result).toEqual(mockData);
  });
});
