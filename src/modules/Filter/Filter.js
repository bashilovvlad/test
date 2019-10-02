import React from "react";
import styled from "styled-components";

import Checkbox from "../../components/Checkbox";

const Container = styled.div`
  width: 230px;
  flex-direction: column;
  background: #ffffff;
  border-radius: 5px;
`;

const Filter = ({ filters, onChange }) => {
  const handleCheck = e => {
    onChange({
      ...filters,
      [e.target.value]: e.target.checked
    });
  };

  return (
    <Container>
      <Checkbox
        label="Без пересадок"
        value={0}
        checked={filters[0]}
        onChange={handleCheck}
      />
      <Checkbox
        label="1 пересадка"
        value={1}
        checked={filters[1]}
        onChange={handleCheck}
      />
      <Checkbox
        label="2 пересадки"
        value={2}
        checked={filters[2]}
        onChange={handleCheck}
      />
      <Checkbox
        label="3 пересадки"
        value={3}
        checked={filters[3]}
        onChange={handleCheck}
      />
    </Container>
  );
};

export default Filter;
