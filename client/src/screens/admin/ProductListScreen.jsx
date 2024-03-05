import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';

import { toast } from 'react-toastify';
import { useBoundStore } from '../../store/index';
import { useProducts } from '../../hooks/useProducts';
import { shallow } from 'zustand/shallow';

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const {
    createProduct,
    isCreateProductLoading,
    isDeleteProductLoading,
    isEditProductLoading,
    deleteProduct,
  } = useBoundStore(
    (store) => ({
      createProduct: store.createProduct,
      isCreateProductLoading: store.isCreateProductLoading,
      isDeleteProductLoading: store.isDeleteProductLoading,
      isEditProductLoading: store.isEditProductLoading,
      deleteProduct: store.deleteProduct,
      editProduct: store.editProduct,
    }),
    shallow
  );

  const { products, isLoading, error, refetch } = useProducts({
    pageNumber,
  });

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch((prevState) => !prevState);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch((prevState) => !prevState);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant='danger'>{error.data.message}</Message>;
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {isCreateProductLoading ||
        isDeleteProductLoading ||
        (isEditProductLoading && <Loader />)}

      <>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm mx-2'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginate pages={10} page={1} isAdmin={true} />
      </>
    </>
  );
};

export default ProductListScreen;
