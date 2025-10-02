import { toast } from 'react-hot-toast';
import Container from '../../components/Container/Container';
import { useFavoritesStore } from '../../store/favoritesStore';
import css from './CarsListFavorites.module.css';
import LikeActive from '../../assets/icons/like-active.svg?react';
import LikeInactive from '../../assets/icons/like-default.svg?react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import type { Car } from '../../types/car';

const CarsListFavorites = () => {
  const { favorites, removeFavorite, addFavorite } = useFavoritesStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (favorites.length === 0) {
      navigate('/');
    }
  }, [favorites, navigate]);

  const handleLike = (car: Car) => {
    if (favorites.some((fav) => fav.id === car.id)) {
      toast((t) => (
        <div className={css.toastWrapper}>
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
      toast.success(' The car has been added to favorites');
    }
  };

  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.title}>
          You're <span className={css.accent}>favorites</span> cars list
        </h1>

        <div className={css.carListWrapper}>
          <ul className={css.carList}>
            {favorites.map((car) => (
              <li key={car.id} className={css.carListItem}>
                <div className={css.imageWrapper}>
                  <img className={css.image} src={car.img} alt={car.description} loading="lazy" />
                  <button className={css.favoriteButton} onClick={() => handleLike(car)}>
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

                <h2 className={css.descriptionText}>{car.description}</h2>

                <Link className={css.btn} to={`/catalog/${car.id}`} role="button">
                  Read more
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default CarsListFavorites;
