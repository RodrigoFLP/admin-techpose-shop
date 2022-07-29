import {
  ActionIcon,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, FileCheck } from "tabler-icons-react";
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

const EditProductPage = () => {
  const largeScreen = useMediaQuery("(min-width: 900px)");

  const [image, setImage] = useState<null | File>(null);

  const handleSubmit = async () => {
    //show toast

    try {
      if (image) {
        const imageSrc = await uploadImage(image);
      }
    } catch (error) {
      //update toast with error
    }
  };

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
  ] = useEditProduct(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
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
        <>
          <Grid columns={24} gutter="xl">
            <Grid.Col span={largeScreen ? 12 : 24}>
              <ProductForm
                initialValues={{
                  title: productState.name,
                  description: productState.description,
                  category: productState.categories[0].name,
                }}
              />
              <Stack>
                <Text mt="md" weight="bold" size="sm">
                  Imagen
                </Text>
                <Group>
                  <ImageDropzone onChange={setImage} image={image} />
                </Group>
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
            onClick={() => image && uploadImage(image)}
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
        </>
      )}
    </LayourInnerDashboard>
  );
};

const MemoizedTForm = React.memo(TagGroupsForm);

export default EditProductPage;
