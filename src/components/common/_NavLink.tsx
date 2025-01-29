import React from "react";
import { NavLink } from "react-router-dom";

type IPROPS = {
  path: string;
  content: string;
};

const _NavLink = ({ path, content }: IPROPS) => {
  return (
    <NavLink style={{ textDecoration: "none", color: "inherit", width: '100%' }} to={path}>
      {content}
    </NavLink>
  );
};

export default _NavLink;
