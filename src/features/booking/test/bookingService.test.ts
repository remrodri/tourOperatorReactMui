import { describe, it, expect, beforeEach } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import axiosInstance from "../../../config/axiosConfig";
import {
  cancelBookingRequest,
  createBookingRequest,
  getAllBookingsRequest,
  updateAttendanceRequest,
  updateBookingRequest,
} from "../service/bookingService";

let mock: AxiosMockAdapter;

describe("Booking Service", () => {
  beforeEach(() => {
    mock = new AxiosMockAdapter(axiosInstance);
  });

  it("getAllBookingsRequest should fetch all bookings", async () => {
    const mockData = {
      statusCode: 200,
      data: [{ id: "1", status: "confirmed" }],
    };
    mock.onGet("/bookings").reply(200, mockData);

    const result = await getAllBookingsRequest();
    expect(result).toEqual(mockData.data);
  });

  it("createBookingRequest should create a new booking", async () => {
    const mockData = {
      statusCode: 201,
      data: { id: "123", status: "pending" },
    };
    mock.onPost("/bookings").reply(201, mockData);

    const formData = new FormData();
    formData.append("tourPackageId", "123");
    formData.append("userId", "456");

    const result = await createBookingRequest(formData);
    expect(result).toEqual(mockData.data);
  });

  it("updateBookingRequest should update an existing booking", async () => {
    const mockData = {
      statusCode: 200,
      data: { id: "123", status: "confirmed" },
    };
    mock.onPut("/bookings/123").reply(200, mockData);

    const result = await updateBookingRequest("123", { status: "confirmed" });
    expect(result).toEqual(mockData.data);
  });

  it("updateAttendanceRequest should update attendance list", async () => {
    const mockData = { statusCode: 200, data: { updated: true } };
    mock.onPut("/bookings/attendance-lists").reply(200, mockData);

    const result = await updateAttendanceRequest({
      bookingId: "123",
      attendees: ["user1", "user2"],
    });
    expect(result).toEqual(mockData.data);
  });

  it("cancelBookingRequest should cancel a booking", async () => {
    const mockData = {
      statusCode: 200,
      data: { id: "123", status: "cancelled" },
    };
    mock.onPut("/bookings/cancel/123").reply(200, mockData);

    const result = await cancelBookingRequest("123", 50, 100, new Date());
    expect(result).toEqual(mockData.data);
  });
});
