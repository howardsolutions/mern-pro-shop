import { Container } from 'react-bootstrap';
import { Header, Footer } from './components';
import './App.css';
import './bootstrap.custom.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
