import { AxiosResponse } from "axios";
import { serverAPI } from "../apis/server.api";

interface Identified {
  id?: number;
}

export class Sync<T extends Identified> {
  constructor(private baseURL: string) {}

  public fetch = (id: number): Promise<AxiosResponse<T>> => {
    return serverAPI.get<T>(`${this.baseURL}/${id}`);
  };

  public save = (data: T): Promise<AxiosResponse> => {
    const { id } = data;

    if (id) {
      return serverAPI.put(`${this.baseURL}/${id}`, data);
    } else {
      return serverAPI.post(this.baseURL, data);
    }
  };
}
