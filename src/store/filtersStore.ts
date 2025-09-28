import { create } from 'zustand';

export interface FetchCarsFilters {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
}

interface FiltersState {
  filters: FetchCarsFilters;
  setFilters: (filters: FetchCarsFilters) => void;
  clearFilters: () => void;
}

const initialFilters: FetchCarsFilters = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
};

export const useFiltersStore = create<FiltersState>()((set) => ({
  filters: initialFilters,
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: initialFilters }),
}));
