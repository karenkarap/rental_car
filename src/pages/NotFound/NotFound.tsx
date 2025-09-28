import { Link } from 'react-router-dom';
import css from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>404</h1>
      <p className={css.text}>Page not found</p>
      <Link to="/" role="button" className={css.button}>
        Back
      </Link>
    </div>
  );
};

export default NotFound;
