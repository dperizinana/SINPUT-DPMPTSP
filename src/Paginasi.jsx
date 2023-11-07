import React, { useEffect, useState } from "react";

const Paginasi = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems, itemsPerPage]);

  return (
    <div className="pagination-container">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        {"<<"}
      </button>
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === 1 || pageNumber === totalPages) {
          return (
            <button
              key={index}
              onClick={() => handleClick(pageNumber)}
              className={
                "pagination-button" +
                (pageNumber === currentPage ? " active" : "")
              }
            >
              {pageNumber}
            </button>
          );
        } else if (pageNumber === currentPage) {
          return (
            <button
              key={index}
              onClick={() => handleClick(pageNumber)}
              className={
                "pagination-button" +
                (pageNumber === currentPage ? " active" : "")
              }
            >
              {pageNumber}
            </button>
          );
        } else if (
          pageNumber === currentPage - 1 ||
          pageNumber === currentPage + 1
        ) {
          return (
            <button
              key={index}
              onClick={() => handleClick(pageNumber)}
              className={
                "pagination-button" +
                (pageNumber === currentPage ? " active" : "")
              }
            >
              {pageNumber}
            </button>
          );
        } else if (pageNumber === 2 || pageNumber === totalPages - 1) {
          return (
            <span key={index} className="pagination-ellipsis">
              ...
            </span>
          );
        }
        return null;
      })}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        {">>"}
      </button>
    </div>
  );
};

export default Paginasi;
