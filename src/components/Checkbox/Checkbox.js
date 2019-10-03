import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  display: flex;
  position: relative;
  cursor: pointer;

  label {
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
  }

  input {
    display: none;
  }

  &:hover {
    background: #f1fcff;
  }
`;

const Text = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  color: #4a4a4a;
  margin-left: 10px;
`;

const CustomBox = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid;
  box-sizing: border-box;
  border-radius: 2px;
  border-color: ${props => (props.checked ? "#2196F3" : "#9ABBCE")};
`;

const Checkmark = styled.div`
  display: ${props => (props.checked ? "block" : "none")};
  position: absolute;
  left: 17px;

  &:after {
    content: "";
    display: block;
    width: 3px;
    height: 6px;
    border: solid #2196f3;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const CheckBox = props => {
  return (
    <Container>
      <label>
        <input
          key={props.id}
          onChange={props.onChange}
          type="checkbox"
          checked={props.checked}
          value={props.value}
        />
        <Checkmark checked={props.checked} />
        <CustomBox checked={props.checked} />
        <Text>{props.label}</Text>
      </label>
    </Container>
  );
};

export default CheckBox;
