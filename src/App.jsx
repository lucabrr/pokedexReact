import { useEffect, useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import PokemonCard from "./PokemonCard";

import {
  MantineProvider,
  TextInput,
  Container,
  Grid,
  Button,
  ActionIcon,
  rem,
  Loader,
  Text,
} from "@mantine/core";
import "@mantine/core/styles.css";
function App() {
  let pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";

  const [pokemonList, setPokemonList] = useState([]);
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [pokemon, setPokemon] = useState(null);

  const search = async (event) => {
    // Se l'evento è un keydown, controlla se il tasto premuto è 'Enter'

    if (event.type === "keydown" && event.key !== "Enter") {
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    const response = await fetch(
      pokemonUrl + inputRef.current.value.toLowerCase()
    );
    if (response.status != 200) {
      setIsLoading(false);
      setErrorMessage(`pokemon ${inputRef.current.value} non trovato`);
      inputRef.current.value = "";
      throw new Error("pokemon non trovato");
    }
    const data = await response.json();
    setPokemon(data);
    setIsLoading(false);
    console.log(data);
  };

  useEffect(() => {
    // fetchPokemom(pokemonUrl)
  }, []);

  const fetchPokemom = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setPokemonList((currentList) => [...currentList, ...data.results]);
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {
        <>
          <Container size="sm">
            <Grid justify="center">
              <Grid.Col span={7} style={{ marginTop: "40px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    onKeyDown={search}
                    ref={inputRef}
                    radius="xl"
                    size="sm"
                    placeholder="Cerca Pokemon"
                    rightSectionWidth={42}
                    error={errorMessage} // Aggiungi questa riga
                    inputWrapperOrder={["label", "input", "error"]} // Aggiungi questa riga
                    leftSection={
                      <IconSearch
                        style={{ width: rem(18), height: rem(18) }}
                        stroke={1.5}
                      />
                    }
                    rightSection={
                      <ActionIcon
                        size={32}
                        radius="xl"
                        variant="gradient"
                        gradient={{ from: "blue", to: "cyan", deg: 90 }}
                      >
                        <IconArrowRight
                          style={{ width: rem(18), height: rem(18) }}
                          stroke={1.5}
                          onClick={search}
                        />
                      </ActionIcon>
                    }
                  />
                  {isLoading && (
                    <Loader size="1rem" style={{ marginLeft: "10px" }} />
                  )}
                </div>
              </Grid.Col>
            </Grid>

            <Grid justify="center">
              <Grid.Col span={{ xs: 8, sm: 6, md: 6 }}>
                {pokemon && <PokemonCard pokemon={pokemon}></PokemonCard>}
              </Grid.Col>
            </Grid>
          </Container>
        </>
      }
    </MantineProvider>
  );
}

export default App;
