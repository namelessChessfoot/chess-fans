import React, { useState } from "react";
import { Box, Button, TextArea } from "grommet";
import { Chess } from "chess.js";

const Debug = () => {
  const [code, setCode] = useState("");

  const getChess = () => {
    console.log("getChess");
    return new Chess();
  };

  const run = () => {
    eval(code);
  };

  return (
    <Box width="100%" align="center" gap="20px" pad="20px">
      <TextArea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ width: "70vw", height: "60vh" }}
      />
      <Button label="run and see console" onClick={run} />
    </Box>
  );
};

export default Debug;
