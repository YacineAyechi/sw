import React from "react";
import "./Pagination.css";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

const Pagination = ({ totalItems, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / 10);

  const handlePageChange = (page) => {
    onPageChange(page);
  };
  return (
    <div className="pagination">
      {/* <div className="leftArrows">
        <AiOutlineLeft
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
      </div> */}

      <div className="pageNumbers">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? "activePage" : ""}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* <div className="rightArrows">
        <AiOutlineRight
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </div> */}
    </div>
  );
};

export default Pagination;
