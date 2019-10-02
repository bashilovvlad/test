import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Button from "../../components/Button";
import Sort from "../Sort";
import ListItem from "./ListItem";

const Container = styled.div`
  width: 500px;
  flex-direction: column;
  border-radius: 5px;
`;

const List = ({ tickets }) => {
  const [sortedList, setSortedList] = useState([]);
  const [count, setCount] = useState(5);
  const [isPriceSort, setPriceSort] = useState(true);

  const handleChangeSortType = type => {
    setPriceSort(type);
  };

  useEffect(() => {
    let list;
    if (isPriceSort) {
      list = [...tickets].sort((a, b) => a.price - b.price);
    } else {
      list = [...tickets].sort(
        (a, b) =>
          a.segments[0].duration +
          a.segments[1].duration -
          (b.segments[0].duration + b.segments[1].duration)
      );
    }

    setSortedList([...list].splice(0, count));
  }, [tickets, count, isPriceSort]);

  return (
    <Container>
      <Sort
        price={isPriceSort}
        onClick={type => handleChangeSortType(type)}
      ></Sort>
      {sortedList.map((i, index) => (
        <ListItem ticket={i} key={index} />
      ))}
      {sortedList.length && sortedList.length !== tickets.length ? (
        <Button
          onClick={() => {
            setCount(count + 5);
          }}
          left
          right
        >
          Show more
        </Button>
      ) : null}
    </Container>
  );
};

export default List;
