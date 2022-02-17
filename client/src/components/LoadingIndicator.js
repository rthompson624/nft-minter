import React from "react";

export default function LoadingIndicator({ loading }) {
  if (loading) {
    return (
      <div className="h-1 bg-blue-500 sticky top-0 animate-pulse"></div>
    );
  }
  return (
    <div className="h-1 bg-white sticky top-0"></div>
  );
}
