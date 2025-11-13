import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { userService } from "../services/userService";
import { User } from "../types/User";

// Mock de axios con Vitest
vi.mock("axios");
const mockedAxios = vi.mocked(axios, { deep: true });

const API_URL = "http://localhost:3000/api/v1/users";

describe("userService", () => {
  const token = "fake-token";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getUsers should call axios.get with correct URL and headers", async () => {
    const mockResponse = {
      data: { statusCode: 200, message: "ok", data: [] },
    };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await userService.getUsers(token);

    expect(mockedAxios.get).toHaveBeenCalledWith(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(result).toEqual(mockResponse.data);
  });

  it("registerUser should send FormData via axios.post", async () => {
    const mockResponse = {
      data: { statusCode: 201, message: "created", data: {} as User },
    };
    mockedAxios.post.mockResolvedValue(mockResponse);

    const userData = { name: "John Doe", email: "john@test.com" };
    const result = await userService.registerUser(userData, token);

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.post.mock.calls[0][0]).toBe(API_URL);
    expect(mockedAxios.post.mock.calls[0][2]).toEqual({
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(result).toEqual(mockResponse.data);
  });

  it("updateUser should call axios.put with correct URL and headers", async () => {
    const mockResponse = {
      data: { statusCode: 200, message: "updated", data: {} as User },
    };
    mockedAxios.put.mockResolvedValue(mockResponse);

    const formData = new FormData();
    formData.append("name", "Jane");
    const userId = "123";

    const result = await userService.updateUser(formData, userId, token);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      `${API_URL}/${userId}`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    expect(result).toEqual(mockResponse.data);
  });

  it("deleteUser should call axios.patch with correct payload and headers", async () => {
    const mockResponse = {
      data: { statusCode: 200, message: "deleted", data: {} as User },
    };
    mockedAxios.patch.mockResolvedValue(mockResponse);

    const userId = "123";
    const result = await userService.deleteUser(userId, token);

    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `${API_URL}/delete-user`,
      { userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    expect(result).toEqual(mockResponse.data);
  });
});
