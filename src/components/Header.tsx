"use client";
import { useState } from "react";
import AddMovie from "./AddMovie";

interface HeaderProps {
  refreshMovies: () => void;
}

function Header({ refreshMovies }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "30px",
        padding: "10px 15px",
      }}
    >
      <img src="/mi-logo-small.png" alt="Logo" />
      <h3
        onClick={handleOpen}
        style={{ cursor: "pointer", color: "#1890ff", margin: 0 }}
      >
        ADD MOVIE
      </h3>

      <AddMovie
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        refreshMovies={refreshMovies}
      />
    </div>
  );
}

export default Header;
