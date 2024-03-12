import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, currentPage, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
        {[...Array(pages).keys()]?.map((page) => (
          <LinkContainer
            key={page + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${page + 1}`
                  : `/page/${page + 1}`
                : `/admin/productlist/${page + 1}`
            }
          >
            <Pagination.Item active={page + 1 === currentPage}>
              {page + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
