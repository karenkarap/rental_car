import { useFavoritesStore } from '../../store/favoritesStore';
import type { Car } from '../../types/car';
import LikeActive from '../../assets/icons/like-active.svg?react';
import LikeInactive from '../../assets/icons/like-default.svg?react';
import css from './FavoriteButton.module.css';
import toast from 'react-hot-toast';
import type React from 'react';

interface FavoriteButtonProps {
  car: Car;
}

const FavoriteButton = ({ car }: FavoriteButtonProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const isFavorite = favorites.some((fav) => fav.id === car.id);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.add(css.heartActive);
    setTimeout(() => e.currentTarget.classList.remove(css.heartActive), 300);

    if (isFavorite) {
      toast((t) => (
        <div className={css.toastWrapper} tabIndex={0}>
          <p>
            Are you sure you want to remove
            <span className={css.accentToast}>
              {car.brand} {car.model}
            </span>
            from favorites?
          </p>

          <div className={css.toastWrapperBtn}>
            <button
              className={css.buttonYes}
              onClick={() => {
                removeFavorite(car.id);
                toast.dismiss(t.id);
                toast.success('The car has been removed from favorites');
              }}
            >
              Yes
            </button>
            <button className={css.buttonNo} onClick={() => toast.dismiss(t.id)}>
              No
            </button>
          </div>
        </div>
      ));
    } else {
      addFavorite(car);
      toast.success('The car has been added to favorites');
    }
  };

  return (
    <button className={`${css.favoriteButton} ${css.heart}`} onClick={handleClick}>
      {isFavorite ? <LikeActive width="16" height="16" /> : <LikeInactive width="16" height="16" />}
    </button>
  );
};

export default FavoriteButton;
