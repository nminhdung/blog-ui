import React, { useState } from 'react'

const Paginate = ({ totalProducts, currentPage }) => {
    console.log(totalProducts, currentPage);
    const totalPages = Math.ceil(totalProducts / import.meta.env.LIMIT);
    return (
        <div>Paginate</div>
    );
};

export default Paginate;