import axios from 'axios';
import queryString from 'query-string';
import { GarageInterface, GarageGetQueryInterface } from 'interfaces/garage';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getGarages = async (query?: GarageGetQueryInterface): Promise<PaginatedInterface<GarageInterface>> => {
  const response = await axios.get('/api/garages', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createGarage = async (garage: GarageInterface) => {
  const response = await axios.post('/api/garages', garage);
  return response.data;
};

export const updateGarageById = async (id: string, garage: GarageInterface) => {
  const response = await axios.put(`/api/garages/${id}`, garage);
  return response.data;
};

export const getGarageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/garages/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGarageById = async (id: string) => {
  const response = await axios.delete(`/api/garages/${id}`);
  return response.data;
};
