import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="z-10 border-b-2 sticky top-1 bg-white text-center py-2">
      <Link to="/">
        <div className="text-2xl font-mono font-bold">Groovy Dudes!</div>
      </Link>
    </div>
  );
}
