import { Card, Image, Text, Badge, Divider } from "@mantine/core";
import { TfiRuler } from "react-icons/tfi";

function PokemonCard({ pokemon }) {
  return (
    <Card
      style={{
        marginTop: "20px",
        backgroundColor: "#29035282",
        borderRadius: "25px",
      }}
      shadow="sm"
      padding="xl"
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
    >
      <Card.Section>
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          h={160}
          alt="No way!"
          fit="contain"
        />
      </Card.Section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Badge fw={500} color="black" size="lg">
          {pokemon.name}
        </Badge>
        {/* <Badge color="gray" size="sm">
          Type: {pokemon.id}
        </Badge> */}
        <Badge color="gray" size="sm">
          ID: {pokemon.id}
        </Badge>
      </div>
      {pokemon.stats.map((stat, index) => {
        return (
          <span key={index} style={{ fontWeight: "bold", marginRight: "10px" }}>
            {stat.stat.name} : {"    "}
            <span style={{ fontWeight: "normal", color: "white" }}>
              {stat.base_stat}pt
            </span>
          </span>
        );
      })}
      <Divider my="md" />

      <Text size="sm">
        <Badge size="xs" mr="10px">
          Height : {pokemon.height}
        </Badge>
        <Badge size="xs" mr="10px">
          Weight : {pokemon.weight}
        </Badge>

        {pokemon.types.map((type, index) => {
          return (
            <Badge size="xs" mr="10px" key={index}>
              type {type.type.name}
            </Badge>
          );
        })}
      </Text>
    </Card>
  );
}
export default PokemonCard;
