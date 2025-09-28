import { create } from 'zustand';
import type { Car } from '../types/car';

interface CarsState {
  allCars: Car[];
  setAllCars: (cars: Car[]) => void;
  addCars: (cars: Car[]) => void;
  resetCars: () => void;
}

export const useCarsStore = create<CarsState>()((set) => ({
  allCars: [],
  setAllCars: (cars) => set({ allCars: cars }),
  addCars: (cars) =>
    set((state) => ({
      allCars: [
        ...state.allCars,
        ...cars.filter(
          (newCar) => !state.allCars.some((existingCar) => existingCar.id === newCar.id)
        ),
      ],
    })),
  resetCars: () => set({ allCars: [] }),
}));
