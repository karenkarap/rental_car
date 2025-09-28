import { keepPreviousData, useQuery } from '@tanstack/react-query';
import CarList from '../../components/CarList/CarList';
import Container from '../../components/Container/Container';
import css from './Catalog.module.css';
import { fetchBrands, fetchCars } from '../../services/api';
import { useEffect, useState } from 'react';
import { useCarsStore } from '../../store/carsStore';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import { useFiltersStore } from '../../store/filtersStore';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import type { CarsHttpResponse } from '../../types/car';

const Catalog = () => {
  const { allCars, setAllCars, addCars, resetCars } = useCarsStore();
  const { filters } = useFiltersStore();
  const [page, setPage] = useState<number>(1);
  const [activeFilters, setActiveFilters] = useState(filters);

  const { data, isLoading, isFetching, isError } = useQuery<CarsHttpResponse>({
    queryKey: ['Car', page, activeFilters],
    queryFn: () => fetchCars({ ...filters, page, limit: 8 }),
    placeholderData: keepPreviousData,
  });

  const { data: brands = [] } = useQuery<string[]>({
    queryKey: ['brand'],
    queryFn: () => fetchBrands(),
  });

  useEffect(() => {
    if (!data) return;

    if (page === 1) {
      setAllCars(data.cars);
    } else {
      addCars(data.cars);
    }
  }, [data, page, setAllCars, addCars]);

  const handleSearch = () => {
    setActiveFilters(filters);
    resetCars();
    setPage(1);
  };

  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.visuallyHidden}>Car catalog</h1>
        {isError && <div>Error</div> && toast.error('Some problem...')}

        <SearchFilters brands={brands} onSearch={handleSearch} />
        {isLoading && <BeatLoader color="#3470ff" size={25} />}
        <CarList cars={allCars} />

        {data && data.page < data.totalPages && (
          <button className={css.button} disabled={isFetching} onClick={() => setPage(page + 1)}>
            {isFetching ? 'Loading...' : 'Load more'}
          </button>
        )}
      </Container>
    </section>
  );
};

export default Catalog;
