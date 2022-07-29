import { Button, Card, Container, Image, Text } from "@mantine/core";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DragDrop2 } from "tabler-icons-react";

interface Props {
  onChange: (file: File | null) => void;
  image: File | null;
}

const ImageDropzone = ({ onChange, image }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any) => {
    onChange(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [], "image/jpeg": [] },
  });

  if (image) {
    return (
      <Card shadow="xs">
        <Card.Section>
          <Image src={URL.createObjectURL(image)} />
        </Card.Section>
        <Button mt="sm" color="red" size="xs" onClick={() => onChange(null)}>
          Eliminar
        </Button>
      </Card>
    );
  }

  return (
    <Container
      {...getRootProps()}
      sx={(theme) => ({
        backgroundColor: isDragActive
          ? theme.colorScheme === "light"
            ? theme.colors.gray[0]
            : theme.colors.dark[8]
          : theme.colorScheme === "light"
          ? theme.colors.gray[1]
          : theme.colors.dark[6],
        padding: "1rem",
        border: `2px dashed ${
          theme.colorScheme === "light"
            ? theme.colors.gray[5]
            : theme.colors.dark[3]
        }`,
        borderRadius: "0.25rem",
        width: "100%",
        transition: "all 0.2s",
        cursor: "pointer",
        height: "120px",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
      })}
    >
      <input {...getInputProps()} />

      <DragDrop2 size={34} />
      <Text size="sm" ml="md">
        {isDragActive
          ? "Suelta la imagen aquí"
          : "Puedes dejar caer la imagen aquí o hacer click para seleccionar una"}
      </Text>
    </Container>
  );
};

export default ImageDropzone;
