import type { Car } from '../../types/car';
import css from './CarList.module.css';
import LikeActive from '../../assets/icons/like-active.svg?react';
import LikeInactive from '../../assets/icons/like-default.svg?react';
import { Link } from 'react-router-dom';
import { useFavoritesStore } from '../../store/favoritesStore';

interface CarListProps {
  cars: Car[];
}

const CarList = ({ cars }: CarListProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  return (
    <div className={css.carListWrapper}>
      <ul className={css.carList}>
        {cars.map((car) => (
          <li key={car.id} className={css.carListItem}>
            <div className={css.imageWrapper}>
              <img className={css.image} src={car.img} alt={car.description} loading="lazy" />
              <button
                className={css.favoriteButton}
                onClick={() =>
                  favorites.some((fav) => fav.id === car.id)
                    ? removeFavorite(car.id)
                    : addFavorite(car)
                }
              >
                {favorites.some((fav) => fav.id === car.id) ? (
                  <LikeActive width="16" height="16" />
                ) : (
                  <LikeInactive width="16" height="16" />
                )}
              </button>
            </div>

            <div className={css.subtitleWrapper}>
              <h2 className={css.subtitle}>
                {car.brand} <span className={css.subtitleAccent}>{car.model}</span>, {car.year}
              </h2>
              <span className={css.price}>${car.rentalPrice}</span>
            </div>

            <ul className={`${css.listDescription} ${css.listDescriptionFirst}`}>
              <li key="city" className={css.listDescriptionItem}>
                {car.address.split(',')[1]}
              </li>
              <li key="country" className={css.listDescriptionItem}>
                {car.address.split(',')[2]}
              </li>
              <li key="company" className={css.listDescriptionItem}>
                {car.rentalCompany}
              </li>
            </ul>

            <ul className={`${css.listDescription} ${css.listDescriptionLast}`}>
              <li key="type" className={css.listDescriptionItem}>
                {car.type}
              </li>
              <li key="mileage" className={css.listDescriptionItem}>
                {car.mileage.toLocaleString('uk-UA')} km
              </li>
            </ul>

            <Link className={css.btn} to={`/catalog/${car.id}`} role="button">
              Read more
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
