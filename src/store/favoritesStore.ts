import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Car } from '../types/car';

interface FavoritesState {
  favorites: Car[];
  addFavorite: (car: Car) => void;
  removeFavorite: (carId: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (car) =>
        set((state) => ({
          favorites: state.favorites.some((fav) => fav.id === car.id)
            ? state.favorites
            : [...state.favorites, car],
        })),
      removeFavorite: (carId) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== carId),
        })),
    }),
    {
      name: 'rental-car-favorites',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
