import React, { useContext } from "react";
import Pagination from "react-js-pagination";

import { ThemeContext } from "../../contexts/ThemeContext";

const CustomPagination = (props) => {
    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;
    const paginationActiveLinkClass = isLightTheme
        ? "paginationActiveLinkClass"
        : "paginationActiveLinkClass-dark";

    window.scrollTo(0, 0);

    return (
        <div className="d-flex justify-content-center mt-5">
            <Pagination
                itemClass="page-item"
                linkClassFirst="paginationLinkClass"
                linkClassPrev="paginationLinkClass"
                linkClassNext="paginationLinkClass"
                linkClassLast="paginationLinkClass"
                activeLinkClass={paginationActiveLinkClass}
                linkClass={"page-link muted_border" + custom_text + ui}
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
