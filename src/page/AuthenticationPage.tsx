import React, { ReactNode } from "react";

const AuthenticationPage: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <div className="container">{children}</div>;
};

export default AuthenticationPage;
