import React, { useState } from "react";
import { Box } from "grommet";
const ShadowBox = ({ children, fill = false, active = true }) => {
  const [hover, setHover] = useState(false);
  const mouseEnter = () => {
    setHover(true && active);
  };
  const mouseLeave = () => {
    setHover(false);
  };
  return (
    <Box
      fill={fill}
      round="10px"
      overflow="hidden"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      style={{
        boxShadow: `0px 0px 10px ${
          hover ? "rgba(111,255,176,0.5)" : "rgba(0,0,0,0.5)"
        }`,
      }}
    >
      {children}
    </Box>
  );
};

export default ShadowBox;
