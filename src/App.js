import React, {
  Component,
  Fragment,
  useMemo,
  useEffect,
  useState
} from "react";
import GlobalStyle from "./globalStyle";
import styled from "styled-components";

import Logo from "./components/Logo";
import Loader from "./components/Loader";
import Message from "./components/Message";
import ScrollTo from "./components/ScrollTo";

import Filter from "./modules/Filter";
import List from "./modules/List";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  width: 750px;
  justify-content: space-between;
  margin: auto;
  align-items: flex-start;
`;

const Aside = styled.div`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonHolder = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const useTickets = () => {
  const [searchId, setSearchId] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(
        `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
      );
      const response = await r.json();
      setTickets(currentTickets => [...currentTickets, ...response.tickets]);
      if (response.stop) {
        setLoaded(true);
      }
    } catch (error) {
      setError("loading error");
    } finally {
      setLoading(false);
    }
  }, [searchId]);

  useEffect(() => {
    fetch("https://front-test.beta.aviasales.ru/search")
      .then(r => r.json())
      .then(({ searchId }) => {
        setSearchId(searchId);
      })
      .catch(error => setError("searchId error"));
  }, []);

  useEffect(() => {
    if (searchId) {
      load();
    }
  }, [searchId, load]);

  return {
    tickets,
    loading,
    error,
    load,
    setError,
    loaded
  };
};

const App = () => {
  const { tickets, error, loading, load, loaded, setError } = useTickets();

  const [filters, setFilters] = useState({
    0: true,
    1: true,
    2: true,
    3: true
  });

  const filteredTickets = useMemo(() => {
    return tickets.filter(i => {
      const toStop = i.segments[0].stops.length;
      const fromStop = i.segments[1].stops.length;

      return filters[toStop] && filters[fromStop];
    });
  }, [filters, tickets]);

  return (
    <Fragment>
      <GlobalStyle />
      {loading ? <Loader /> : null}
      <Layout>
        <ButtonHolder>{!loaded && <Logo onClick={load}></Logo>}</ButtonHolder>
        <Container>
          <Aside>
            <Filter
              filters={filters}
              onChange={f => {
                setFilters(f);
              }}
            />
          </Aside>
          <Main>
            <List list={filteredTickets} />
            {error ? (
              <Message
                error
                text={error}
                onClose={() => setError("")}
              ></Message>
            ) : null}
          </Main>
        </Container>
      </Layout>
      <ScrollTo />
    </Fragment>
  );
};

export default App;
