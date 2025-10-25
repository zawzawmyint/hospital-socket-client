import React from "react";

const Container = ({ maxWidth = "max-w-5xl", children }) => {
  return (
    <div
      className={`${maxWidth}  mx-auto rounded-xl bg-gray-200 mt-6 space-y-6 p-8`}
    >
      {children}
    </div>
  );
};

export default Container;
