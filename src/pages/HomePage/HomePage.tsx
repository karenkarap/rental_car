import { Link } from 'react-router-dom';
import css from './HomePage.module.css';
import Container from '../../components/Container/Container';

const HomePage = () => {
  return (
    <section className={css.heroSection}>
      <Container>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>Reliable and budget-friendly rentals for any journey</p>
        <Link className={css.btn} to="/catalog" role="button">
          View Catalog
        </Link>
      </Container>
    </section>
  );
};

export default HomePage;
