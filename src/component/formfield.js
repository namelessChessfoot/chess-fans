import React, { useState } from "react";
import { Box, TextInput, Text } from "grommet";

const FormField = ({ config, value = "", onChange = () => {} }) => {
  const { label, type, required = false } = config;
  const [warn, setWarn] = useState(false);
  const onBlur = () => {
    if (required && value.length === 0) {
      setWarn(true);
    }
  };
  const myOnChange = (e) => {
    onChange(e);
    setWarn(false);
  };
  return (
    <Box direction="row" align="center" gap="10px">
      <Box
        width="100px"
        direction="row"
        justify="end"
        style={{ position: "relative" }}
        gap="3px"
      >
        {required && <Text color="status-warning">*</Text>}
        <Text>{label}</Text>
      </Box>
      <TextInput
        placeholder={label}
        value={value}
        type={type}
        onChange={myOnChange}
        style={{ border: warn && "1px solid #FFAA15" }}
        onFocus={() => setWarn(false)}
        onBlur={onBlur}
      />
    </Box>
  );
};

export default FormField;
