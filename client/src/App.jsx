import { Container } from 'react-bootstrap';
import { Header, Footer } from './components';
import './App.css';
import './bootstrap.custom.css';
import { ToastContainer } from 'react-toastify';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import { useGetPaypalInitialOptions } from './hooks';

const App = () => {
  const { paypalInitialOptions } = useGetPaypalInitialOptions();

  return (
    <>
      <ToastContainer />
      <Header />
      <main className='py-3'>
        <Container>
          <PayPalScriptProvider options={paypalInitialOptions}>
            <Outlet />
          </PayPalScriptProvider>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
