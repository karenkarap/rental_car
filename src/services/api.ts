import axios from 'axios';
import type { Car, CarsHttpResponse } from '../types/car';

export interface FetchCarsProps {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  limit?: number;
  page?: number;
}

const api = axios.create({
  baseURL: 'https://car-rental-api.goit.global/',
});

export const fetchCars = async ({
  brand,
  rentalPrice,
  minMileage,
  maxMileage,
  limit,
  page,
}: FetchCarsProps): Promise<CarsHttpResponse> => {
  const response = await api.get<CarsHttpResponse>('cars', {
    params: {
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
      limit,
      page,
    },
  });
  return response.data;
};

export const fetchBrands = async (): Promise<string[]> => {
  const response = await api.get<string[]>('brands');
  return response.data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const response = await api.get<Car>(`cars/${id}`);
  return response.data;
};
