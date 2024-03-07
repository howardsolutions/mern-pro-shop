import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components';
import { useProducts } from '../hooks/index';
import Loader from '../components/Loader';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

function HomeScreenPage() {
  const { pageNumber, keywords } = useParams();
  const { data, isLoading } = useProducts({ pageNumber, keywords });

  if (isLoading) return <Loader />;

  return (
    <div>
      {!keywords ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      <>
        <h1>Latest Product</h1>
        <Row>
          {data &&
            data.products &&
            data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
        <Paginate
          pages={data?.pages}
          currentPage={data?.page}
          keywords={keywords ? keywords : ''}
        />
      </>
    </div>
  );
}

export default HomeScreenPage;
