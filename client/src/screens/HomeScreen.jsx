import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components';
import { useProducts } from '../hooks/index';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';

function HomeScreenPage() {
  const { pageNumber, keywords } = useParams();
  const { data, isLoading } = useProducts({ pageNumber, keywords });

  if (isLoading) return <Loader />;

  return (
    <div>
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
        page={data?.page}
        keyword={keywords ? keywords : ''}
      />
    </div>
  );
}

export default HomeScreenPage;
