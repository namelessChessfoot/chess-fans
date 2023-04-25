import React, { useEffect, useState } from "react";
import { Box, TextInput, Grommet, Spinner, Keyboard } from "grommet";
import { Search as SIcon } from "grommet-icons";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import PlayerBar from "../player/playerbar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../component/loading";
import { searchThunk } from "../services/page-thunks";
const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = queryString.parse(location.search);
  const name = query.name || "";
  const { data, loading } = useSelector((state) => state.page);
  useEffect(() => {
    dispatch(searchThunk(name));
  }, [name]);
  return (
    <Box width="100%" align="center">
      <SearchBar value={name} />
      {loading && <Loading />}
      {!loading && data && <PlayerBar player={data} />}
    </Box>
  );
};

const SearchBar = ({ value = "" }) => {
  const small = "2%";
  const large = "10%";
  const [focus, setFocus] = useState(false);
  const [content, setContent] = useState(value);
  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };
  const onChange = (e) => {
    const val = e.target.value;
    setContent(val);
  };
  const navigate = useNavigate();
  const onSearch = () => {
    setFocus(false);
    const textinput = document.getElementById("my-textinput");
    textinput.blur();
    if (content === value) {
      return;
    }
    let query = "";
    if (content.length > 0) {
      query = "?" + queryString.stringify({ name: content });
    }
    navigate(`/search${query}`);
  };

  return (
    <Keyboard onEnter={onSearch}>
      <Box
        width="100%"
        pad={{ vertical: "10px", horizontal: focus ? large : small }}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <Box
          direction="row"
          width="100%"
          align="center"
          round="10px"
          border={focus ? { color: "focus", size: "2px" } : {}}
        >
          <Box
            onClick={onSearch}
            height="100%"
            justify="center"
            align="center"
            border={false}
            width={focus ? "75px" : "55px"}
            style={{ paddingLeft: "10px", boxShadow: "none" }}
          >
            <Spinner
              animation={
                focus ? { type: "pulse", duration: 650, size: "xlarge" } : {}
              }
            >
              <SIcon style={{ cursor: "pointer" }} color={focus && "focus"} />
            </Spinner>
          </Box>
          <Grommet
            theme={{
              global: {
                focus: "transparent",
              },
            }}
            style={{ width: "100%" }}
          >
            <TextInput
              id="my-textinput"
              placeholder="Any player?"
              style={{ border: "none", outline: "none" }}
              value={content}
              onChange={onChange}
            />
          </Grommet>
        </Box>
      </Box>
    </Keyboard>
  );
};

export default Search;
