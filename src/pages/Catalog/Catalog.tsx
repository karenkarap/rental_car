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
  const [isSearching, setIsSearching] = useState(false);

  const { data, isLoading, isFetching, isError } = useQuery<CarsHttpResponse>({
    queryKey: ['Car', page, activeFilters],
    queryFn: () => fetchCars({ ...activeFilters, page, limit: 8 }),
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
      setIsSearching(false);
    } else {
      addCars(data.cars);
    }
  }, [data, page, setAllCars, addCars]);

  const handleSearch = () => {
    setIsSearching(true);
    setActiveFilters(filters);
    resetCars();
    setPage(1);
  };

  const showLoader = isLoading || (isSearching && isFetching);
  const showNoResults = !showLoader && allCars.length === 0 && !isError;

  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.visuallyHidden}>Car catalog</h1>

        <SearchFilters brands={brands} onSearch={handleSearch} />

        <CarList cars={allCars} />

        <div className={css.warnings}>
          {isError && <div>Error</div> && toast.error('Some problem...')}
          {showNoResults && <p>No results found. Please try different search parameters</p>}
        </div>

        {data && data.page < data.totalPages && !showLoader && (
          <button className={css.button} disabled={isFetching} onClick={() => setPage(page + 1)}>
            {isFetching ? 'Loading...' : 'Load more'}
          </button>
        )}
      </Container>
      {showLoader && (
        <div className={css.overlay}>
          <BeatLoader color="#3470ff" size={25} />
        </div>
      )}
    </section>
  );
};

export default Catalog;
