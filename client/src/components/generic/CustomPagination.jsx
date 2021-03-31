import React from "react";
import Pagination from "react-js-pagination";

const CustomPagination = (props) => {
    return (
        <div className="d-flex justify-content-center mt-5">
            <Pagination
                itemClass="page-item"
                linkClass="page-link"
                itemsCountPerPage={10}
                pageRangeDisplayed={5}
                activePage={props.activePage}
                onChange={props.handlePageClick}
                totalItemsCount={props.totalPage * 10}
            />
        </div>
    );
};

export default CustomPagination;
