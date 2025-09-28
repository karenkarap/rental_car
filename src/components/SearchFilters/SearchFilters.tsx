import css from './SearchFilters.module.css';
import Dropdown from '../Dropdown/Dropdown';
import { useFiltersStore } from '../../store/filtersStore';
import { useCarsStore } from '../../store/carsStore';
import { NumericFormat } from 'react-number-format';

interface SearchFiltersProps {
  brands: string[];
  onSearch: () => void;
}

const SearchFilters = ({ brands, onSearch }: SearchFiltersProps) => {
  const { filters, setFilters } = useFiltersStore();
  const { resetCars } = useCarsStore();

  const priceList: string[] = [];
  for (let price = 30; price <= 150; price += 10) {
    priceList.push(price.toString());
  }

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetCars();
    onSearch();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <Dropdown
        classHeight={css.brandHeight}
        className={css.brandSelect}
        placeholder={'Choose a brand'}
        label={'Car brand'}
        options={brands}
        value={filters.brand}
        onChange={(value) => handleFilterChange('brand', value)}
      />
      <Dropdown
        className={css.priceSelect}
        classHeight={css.priceHeight}
        placeholder={'Choose a price'}
        textBefore={'To $'}
        label={'Price/ 1 hour'}
        options={priceList}
        value={filters.rentalPrice}
        onChange={(value) => handleFilterChange('rentalPrice', value)}
      />

      <div className={css.mileageWrapper}>
        <label className={css.label} htmlFor="mileageFrom">
          Сar mileage / km
        </label>
        <div className={css.inputWrapper}>
          <NumericFormat
            id="mileageFrom"
            className={css.mileageFrom}
            value={filters.minMileage}
            onValueChange={(values) => handleFilterChange('minMileage', values.value.toString())}
            prefix="From "
            thousandSeparator={true}
            placeholder="From "
            allowNegative={false}
            decimalScale={0}
          />
          <NumericFormat
            id="mileageTo"
            className={css.mileageTo}
            value={filters.maxMileage}
            onValueChange={(values) => handleFilterChange('maxMileage', values.value.toString())}
            prefix="To "
            thousandSeparator={true}
            placeholder="To "
            allowNegative={false}
            decimalScale={0}
          />
        </div>
      </div>

      <button type="submit" className={css.btn}>
        Search
      </button>
    </form>
  );
};

export default SearchFilters;
