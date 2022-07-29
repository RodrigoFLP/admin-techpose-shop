import { Center, Container, Loader } from "@mantine/core";

const Loading = () => {
  return (
    <Container
      sx={() => ({
        height: "100%",
        width: "100%",
      })}
    >
      <Center
        sx={() => ({
          height: "100vh",
        })}
      >
        <Loader />
      </Center>
    </Container>
  );
};

export default Loading;
