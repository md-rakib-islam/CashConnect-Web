import { useRouter } from "next/router";
import React from "react";
import ReactPaginate from "react-paginate";
import { SpaceProps } from "styled-system";
import Button from "../buttons/Button";
import Icon from "../icon/Icon";
import { StyledPagination } from "./PaginationStyle";

export interface PaginationProps extends SpaceProps {
  pageCount: number;
  marginPagesDisplayed?: number;
  pageRangeDisplayed?: number;
  onChange?: (data: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  marginPagesDisplayed,
  pageRangeDisplayed,
  onChange,
  ...props
}) => {
  const router = useRouter()
  const handlePageChange = async (page) => {
    if (onChange) onChange(page.selected);
    const query = router.query
    router.push({
      pathname: `${router.pathname}`,
      query: { ...query, page: page.selected + 1 },
    })
  };

  const page: any = router.query.page

  return (
    <StyledPagination {...props}>
      <ReactPaginate
        previousLabel={
          <Button
            className="control-button"
            color="primary"
            overflow="hidden"
            height="auto"
            padding="6px"
            borderRadius="50%"
          >
            <Icon defaultcolor="currentColor" variant="small">
              chevron-left
            </Icon>
          </Button>
        }
        nextLabel={
          <Button
            className="control-button"
            color="primary"
            overflow="hidden"
            height="auto"
            padding="6px"
            borderRadius="50%"
          >
            <Icon defaultcolor="currentColor" variant="small">
              chevron-right
            </Icon>
          </Button>
        }
        breakLabel={
          <Icon defaultcolor="currentColor" variant="small">
            triple-dot
          </Icon>
        }
        pageCount={pageCount}
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageRangeDisplayed}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
        disabledClassName="disabled"
        forcePage={page ? (page - 1) : 0}
      />
    </StyledPagination>
  );
};

export default Pagination;
