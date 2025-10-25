import React from "react";

const PageHeader = ({ title, description, children }) => {
  return (
    <div className="flex justify-between items-center flex-wrap">
      <div className="space-y-2">
        <p className="text-xl font-bold text-black/70">{title}</p>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>
      <div>{children && children}</div>
    </div>
  );
};

export default PageHeader;
