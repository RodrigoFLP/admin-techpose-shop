import {
  ActionIcon,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Input,
  Modal,
  Select,
  Tabs,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, At, FileCheck, Plus } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import { mockProduct } from "../../mocks/product";
import PortionCard from "./PortionCard";
import PortionForm from "./PortionForm";
import PortionSection from "./PortionsSection";
import TagsSection from "./TagsSection";

const EditProductPage = () => {
  const product = mockProduct;
  const largeScreen = useMediaQuery("(min-width: 900px)");

  const [showPortionModal, setShowPortionModal] = useState(false);

  const openPortionModal = () => {
    setShowPortionModal(true);
  };

  return (
    <LayourInnerDashboard
      title="Editar producto #232"
      leftAction={
        <Link to="/dashboard/productos">
          <ActionIcon>
            <ArrowLeft />
          </ActionIcon>
        </Link>
      }
    >
      <form>
        <Grid columns={24} gutter="xl">
          <Grid.Col span={largeScreen ? 12 : 24}>
            <TextInput mt={"xs"} label="Título" placeholder="Título" />
            <Textarea mt={"xs"} label="Descripción" placeholder="Descripción" />
            <Select
              mt={"xs"}
              label="Categoría"
              placeholder="Pick one"
              data={[
                { value: "entradas", label: "Entradas" },
                { value: "tacos", label: "Tacos" },
                { value: "tortas", label: "Tortas" },
                { value: "bebidas", label: "Bebidas" },
              ]}
            />
          </Grid.Col>
          <Grid.Col span={largeScreen ? 12 : 24}>
            <PortionSection
              openModal={() => {
                openPortionModal();
              }}
            />
            <TagsSection />
          </Grid.Col>
        </Grid>
      </form>
      <Button leftIcon={<FileCheck size={16} />} mt="xl">
        Guardar
      </Button>
      <Modal
        opened={showPortionModal}
        onClose={() => setShowPortionModal(false)}
        title="Introduce yourself!"
      >
        <PortionForm />
      </Modal>
    </LayourInnerDashboard>
  );
};

export default EditProductPage;
