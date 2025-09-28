import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import HomePage from '../../pages/HomePage/HomePage';
import Catalog from '../../pages/Catalog/Catalog';
import CarDetails from '../../pages/CarDetails/CarDetails';
import { Toaster } from 'react-hot-toast';
import NotFound from '../../pages/NotFound/NotFound';

function App() {
  return (
    <>
      <Toaster />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CarDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
