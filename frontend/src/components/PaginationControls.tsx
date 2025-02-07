import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void; // Pass the function to handle page change
}

const PaginationControls: React.FC<Props> = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page); // Call the parent function to update the page
    }
  };

  return (
    <ButtonGroup variant="contained" color="primary">
      <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </Button>
      <Button disabled>{currentPage}</Button>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </ButtonGroup>
  );
};

export default PaginationControls;
