import React from "react";
import { Link } from "react-router-dom";
import {
  ActionIcon,
  Button,
  Container,
  Grid,
  Image,
  Modal,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ArrowLeft, CurrencyDollar, FileCheck } from "tabler-icons-react";

import PortionForm from "./forms/PortionForm";
import TagGroupsForm from "./forms/TagGroupsForm";

import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import ImageDropzone from "../../components/ImageDropzone";
import Loading from "../../components/Loading";

import PortionSection from "./PortionsSection";
import TagsSection from "./TagsSection";
import useEditProduct from "../../hooks/useEditProduct";

const EditProductPage = () => {
  const [
    productState,
    categories,
    tags,
    id,
    handleSubmit,
    image,
    setImage,
    setProductState,
    showPortionModal,
    openPortionModal,
    closePortionModal,
    portionToEdit,
    onSavePortion,
    onDeletePortion,
    showTagGroup,
    openTagGroupModal,
    closeTagGroupModal,
    tagGroupToEdit,
    onSaveTagGroup,
    onDeleteTagGroup,
    form,
    isLoading,
    isError,
    isNewProduct,
  ] = useEditProduct();

  const largeScreen = useMediaQuery("(min-width: 900px)");

  //

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>"Error"</div>;
  }

  return (
    <LayourInnerDashboard
      title={isNewProduct ? `Editar producto #${id}` : "Nuevo producto"}
      leftAction={
        <Link to="/dashboard/productos">
          <ActionIcon>
            <ArrowLeft />
          </ActionIcon>
        </Link>
      }
    >
      {productState && categories && tags && (
        <form>
          <Grid columns={24} gutter="xl">
            <Grid.Col span={largeScreen ? 12 : 24}>
              <NumberInput
                {...form.getInputProps("id")}
                mt={"xs"}
                label="Id"
                placeholder="Id"
              />
              <TextInput
                {...form.getInputProps("title")}
                mt={"xs"}
                label="Título"
                placeholder="Título"
              />
              <Textarea
                {...form.getInputProps("description")}
                mt={"xs"}
                label="Descripción"
                placeholder="Descripción"
              />
              <NumberInput
                {...form.getInputProps("price")}
                mt={"xs"}
                label="Precio"
                placeholder="Precio"
                min={0}
                precision={2}
                step={0.01}
                icon={<CurrencyDollar size={16} />}
              />

              <Select
                {...form.getInputProps("category")}
                mt={"xs"}
                label="Categoría"
                placeholder="Elige una"
                data={[
                  ...categories.map((category) => ({
                    value: `${category.id}`,
                    label: category.name,
                  })),
                ]}
              />

              <Select
                {...form.getInputProps("tagCategory")}
                mt={"xs"}
                label="Tag"
                placeholder="Elige una"
                data={[
                  ...tags.map((tag) => ({
                    value: `${tag.id}`,
                    label: tag.name,
                  })),
                ]}
                clearable
              />
              <Stack>
                <Text mt="md" weight="bold" size="sm">
                  Imagen
                </Text>
                <Grid columns={3} align="center">
                  <Grid.Col span={1}>
                    <Container>
                      {productState.image ? (
                        <Image
                          height={64}
                          src={productState.image}
                          radius="sm"
                          caption="Imagen actual"
                        />
                      ) : (
                        <Text size="sm">No existe imagen</Text>
                      )}
                    </Container>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <ImageDropzone onChange={setImage} image={image} />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Grid.Col>
            <Grid.Col span={largeScreen ? 12 : 24}>
              <PortionSection
                openModal={openPortionModal}
                portions={productState.portions}
              />
              <TagsSection
                tagGroups={productState.portionsTagGroups}
                openModal={openTagGroupModal}
              />
            </Grid.Col>
          </Grid>

          <Button
            leftIcon={<FileCheck size={16} />}
            mt="xl"
            onClick={handleSubmit}
          >
            Guardar
          </Button>

          <Modal
            opened={showPortionModal}
            onClose={closePortionModal}
            title="Porción"
          >
            <PortionForm
              portion={portionToEdit}
              onSave={onSavePortion}
              onDelete={onDeletePortion}
            />
          </Modal>
          <Modal
            opened={showTagGroup}
            onClose={closeTagGroupModal}
            title="Grupo de tags"
          >
            <MemoizedTForm
              portions={productState.portions}
              tagGroup={tagGroupToEdit}
              onSave={onSaveTagGroup}
              onDelete={onDeleteTagGroup}
            />
          </Modal>
        </form>
      )}
    </LayourInnerDashboard>
  );
};

const MemoizedTForm = React.memo(TagGroupsForm);

export default EditProductPage;
