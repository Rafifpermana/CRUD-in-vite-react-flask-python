import React from "react";

export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control w-auto mx-0"
        style={{
          maxWidth: "300px",
          borderRadius: "50px",
        }}
        placeholder="Search by NPM or Name"
        value={searchQuery}
        onChange={onSearchChange}
      />
    </div>
  );
}
