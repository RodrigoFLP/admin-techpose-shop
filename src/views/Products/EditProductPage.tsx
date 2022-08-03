import {
  ActionIcon,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Modal,
  NumberInput,
  Select,
  SelectItem,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Cross,
  CurrencyDollar,
  FileCheck,
} from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";

import PortionForm from "./forms/PortionForm";
import PortionSection from "./PortionsSection";
import TagsSection from "./TagsSection";
import TagGroupsForm from "./forms/TagGroupsForm";
import useEditProduct from "../../hooks/useEditProduct";

import { uploadImage } from "../../utils/uploadImage";
import ProductForm from "./forms/ProductsForm";
import Loading from "../../components/Loading";
import ImageDropzone from "../../components/ImageDropzone";
import { useUpdateProductMutation } from "../../services/products";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useGetAllCategoriesQuery } from "../../services/categories";

const EditProductPage = () => {
  const largeScreen = useMediaQuery("(min-width: 900px)");

  const [image, setImage] = useState<null | File>(null);

  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const [
    productState,
    isLoading,
    isError,
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
  ] = useEditProduct(id);

  const [updateProduct, result] = useUpdateProductMutation();

  const {
    data: categories,
    isSuccess: isCategoriesSuccess,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    isUninitialized: isCategoriesUnintialized,
  } = useGetAllCategoriesQuery();

  const handleSubmit = async () => {
    console.log(productState);

    try {
      let imageSrc;

      if (image) {
        showNotification({
          id: "load-product",
          loading: true,
          title: "Subiendo Imagen",
          message: "Se está subiendo la imagen al servidor",
          autoClose: false,
          disallowClose: true,
        });
        imageSrc = await uploadImage(image);
        updateNotification({
          id: "load-product",
          loading: true,
          title: "Actualizando producto",
          message: "Se está actualizando",
          autoClose: false,
          disallowClose: true,
        });
      }

      if (!imageSrc) {
        showNotification({
          id: "load-product",
          loading: true,
          title: "Actualizando producto",
          message: "Se está actualizando el producto",
          autoClose: false,
          disallowClose: true,
        });
      }

      if (!productState) {
        throw new Error("Producto inválido");
      }

      await updateProduct({
        id: productState.id,
        name: form.values.title,
        categoriesId: [parseInt(form.values.category)],
        description: form.values.description,
        image: imageSrc ? imageSrc : productState.image,
        price:
          typeof form.values.price !== "number"
            ? parseFloat(form.values.price)
            : form.values.price,
        portions: productState.portions,
        portionsTagGroups: productState.portionsTagGroups,
        tags: productState.tags,
      });

      updateNotification({
        id: "load-product",
        color: "teal",
        title: "Listo",
        message: "El producto se ha actualizado con éxito",
        icon: <Check />,
        autoClose: 2000,
      });
    } catch (error) {
      updateNotification({
        id: "load-data",
        color: "red",
        title: "Error",
        message: "Ha ocurrido un error",
        icon: <Cross />,
        autoClose: 2000,
      });
    }
  };

  if (isLoading || isCategoriesLoading) {
    return <Loading />;
  }

  if (isError || isCategoriesError) {
    return <div>"Error"</div>;
  }

  return (
    <LayourInnerDashboard
      title={`Editar producto #${id}`}
      leftAction={
        <Link to="/dashboard/productos">
          <ActionIcon>
            <ArrowLeft />
          </ActionIcon>
        </Link>
      }
    >
      {productState && (
        <form>
          <Grid columns={24} gutter="xl">
            <Grid.Col span={largeScreen ? 12 : 24}>
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
