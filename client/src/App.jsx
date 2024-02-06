import { Container } from 'react-bootstrap';
import { Header, Footer } from './components';
import './App.css';
import './bootstrap.custom.css';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
