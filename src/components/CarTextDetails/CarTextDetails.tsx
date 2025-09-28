import type { Car } from '../../types/car';
import LocationIcon from '../../assets/icons/location.svg?react';
import CheckedIcon from '../../assets/icons/checked.svg?react';
import YearIcon from '../../assets/icons/yearIcon.svg?react';
import CarTypeIcon from '../../assets/icons/car-type.svg?react';
import GasolineIcon from '../../assets/icons/gasoline-icon.svg?react';
import EngineIcon from '../../assets/icons/engine-size.svg?react';
import css from './CarTextDetails.module.css';

interface CarTextDetailsProps {
  car: Car;
}

const CarTextDetails = ({ car }: CarTextDetailsProps) => {
  return (
    <>
      <div className={css.titleWrapper}>
        <h1 className={css.title}>{`${car.brand} ${car.model}, ${car.year} `}</h1>
        <span className={css.id}>{`id: ${car.id.slice(0, 5)}`}</span>
      </div>

      <div className={css.locationWrapper}>
        <LocationIcon className={css.logo} />
        <p className={css.city}>{`${car.address.split(',')[1]}, ${car.address.split(',')[2]}`}</p>
        <span className={css.mileage}>{`Mileage: ${car.mileage.toLocaleString('uk-UA')} km`}</span>
      </div>

      <span className={css.price}>{`$ ${car.rentalPrice}`}</span>
      <h2 className={css.description}>{car.description}</h2>

      <div className={css.detailWrapper}>
        <div>
          <h3 className={css.subtitle}>Rental Conditions: </h3>
          <div className={css.conditionsWrapper}>
            {car.rentalConditions.map((condition) => (
              <div key={condition} className={css.subtitleWrapper}>
                <CheckedIcon />
                <p className={css.text}>{condition}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className={css.subtitle}>Rental Conditions: </h3>
          <div className={css.conditionsWrapper}>
            <div className={css.subtitleWrapper}>
              <YearIcon />
              <p className={css.text}>{`Year: ${car.year}`}</p>
            </div>
            <div className={css.subtitleWrapper}>
              <CarTypeIcon />
              <p className={css.text}>{`Type: ${car.type}`}</p>
            </div>
            <div className={css.subtitleWrapper}>
              <GasolineIcon />
              <p className={css.text}>{`Fuel Consumption: ${car.fuelConsumption}`}</p>
            </div>
            <div className={css.subtitleWrapper}>
              <EngineIcon />
              <p className={css.text}>{`Engine Size: ${car.engineSize}`}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className={css.subtitle}>Accessories and functionalities:</h3>
          <div className={css.conditionsWrapper}>
            {car.accessories.map((condition) => (
              <div key={condition} className={css.subtitleWrapper}>
                <CheckedIcon />
                <p className={css.text}>{condition}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarTextDetails;
