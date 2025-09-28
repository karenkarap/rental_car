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

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<Car>({
    queryKey: ['CarDetails', id],
    queryFn: () => {
      if (!id) throw new Error('No car ID provided');
      return fetchCarById(id);
    },
    enabled: !!id,
  });

  return (
    <section className={css.sectionDetails}>
      <Container>
        {isError && <div>Error</div> && toast.error('Some problem...')}

        <div className={css.wrapper}>
          <div className={css.leftColumn}>
            {data && (
              <img className={css.image} src={data.img} alt={data.description} loading="lazy" />
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
