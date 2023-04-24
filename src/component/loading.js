import React, { useEffect, useState } from "react";
import { Spinner, Text, Box } from "grommet";

const Loading = () => {
  return (
    <Box direction="row" gap="20px" pad={{ top: "35vh" }}>
      <Spinner border={{ side: "all", size: "medium", style: "dotted" }} />
      <Text>Loading...</Text>
    </Box>
  );
};

export default Loading;
