import React from "react";
import { Navigate } from 'react-router-dom';

export default function AdminGaurd({ isOwner, children }) {
  return isOwner ? children : <Navigate to="/" />;
}
