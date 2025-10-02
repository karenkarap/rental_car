import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import type { Car } from '../../types/car';
import { fetchCarById } from '../../services/api';
import Container from '../../components/Container/Container';
import css from './CarDetails.module.css';
import CarTextDetails from '../../components/CarTextDetails/CarTextDetails';
import BookingForm from '../../components/BookingForm/BookingForm';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useFavoritesStore } from '../../store/favoritesStore';
import LikeActive from '../../assets/icons/like-active.svg?react';
import LikeInactive from '../../assets/icons/like-default.svg?react';

const CarDetails = () => {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<Car>({
    queryKey: ['CarDetails', id],
    queryFn: () => {
      if (!id) throw new Error('No car ID provided');
      return fetchCarById(id);
    },
    enabled: !!id,
  });
  console.log(favorites);
  return (
    <section className={css.sectionDetails}>
      <Container>
        {isError && <div>Error</div> && toast.error('Some problem...')}

        <div className={css.wrapper}>
          <div className={css.leftColumn}>
            {data && (
              <div className={css.imageWrapper}>
                <img className={css.image} src={data.img} alt={data.description} loading="lazy" />
                <button
                  className={css.favoriteButton}
                  onClick={() =>
                    favorites.some((fav) => fav.id === data.id)
                      ? removeFavorite(data.id)
                      : addFavorite(data)
                  }
                >
                  {favorites.some((fav) => fav.id === data.id) ? (
                    <LikeActive width="16" height="16" />
                  ) : (
                    <LikeInactive width="16" height="16" />
                  )}
                </button>
              </div>
            )}
            {data && <BookingForm />}
          </div>

          <div className={css.rigthColumn}>{data && <CarTextDetails car={data} />}</div>
        </div>
      </Container>
      {isLoading && (
        <div className={css.overlay}>
          <BeatLoader color="#3470ff" size={25} />
        </div>
      )}
    </section>
  );
};

export default CarDetails;
