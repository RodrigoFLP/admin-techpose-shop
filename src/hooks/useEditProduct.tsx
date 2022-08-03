import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Portion, Product, TagGroup } from "../interfaces";
import { mockProduct } from "../mocks/product";
import { useGetOneQuery } from "../services/products";

interface initialValues {
  title: string;
  description: string;
  category: string;
  price: number;
}

const useEditProduct = (id: string) => {
  const form = useForm({
    initialValues: { title: "", description: "", category: "", price: 0 },
  });

  const {
    data: product,
    isSuccess,
    isLoading: isProductsLoading,
    isUninitialized: isProductsUnintialized,
    isError,
  } = useGetOneQuery(id);

  const isLoading = isProductsLoading || isProductsUnintialized;

  const [productState, setProductState] = useState<Product | null>(null);

  const [portionToEdit, setPortionToEdit] = useState<Portion | null>(null);

  const [tagGroupToEdit, setTagGroupToEdit] = useState<TagGroup | null>(null);

  useEffect(() => {
    //API call retrieve product

    if (isSuccess) {
      setProductState(product);
      form.setValues({
        title: product.name,
        description: product.description,
        category: `${product.categories[0].id}`,
        price:
          typeof product.price !== "number"
            ? parseFloat(product.price)
            : product.price,
      });
    }
  }, [isSuccess]);

  const onSavePortion = (newPortion: Portion) => {
    setPortionToEdit(null);

    if (portionToEdit === null) {
      setProductState(
        (prev) =>
          ({ ...prev, portions: [...prev!.portions, newPortion] } as Product)
      );
    }

    if (portionToEdit) {
      setProductState(
        (prev) =>
          ({
            ...prev,
            portions: prev!.portions.map((portion) =>
              portion.id === newPortion.id ? newPortion : portion
            ),
          } as Product)
      );
    }

    closePortionModal();
  };

  const onDeletePortion = (id: number | string) => {
    setProductState(
      (prev) =>
        ({
          ...prev,
          portions: [...prev!.portions.filter((portion) => portion.id !== id)],
        } as Product)
    );
    closePortionModal();
  };

  const [showPortionModal, setShowPortionModal] = useState(false);

  const openPortionModal = (portion: Portion | null) => {
    setPortionToEdit(portion);
    setShowPortionModal(true);
  };

  const closePortionModal = () => {
    setPortionToEdit(null);
    setShowPortionModal(false);
  };

  const [showTagGroup, setShowTagGroup] = useState(false);

  const openTagGroupModal = (tagGroup: TagGroup | null) => {
    setTagGroupToEdit(tagGroup);
    setShowTagGroup(true);
  };

  const closeTagGroupModal = () => {
    setTagGroupToEdit(null);
    setShowTagGroup(false);
  };

  const onSaveTagGroup = (newTagGroup: TagGroup) => {
    setTagGroupToEdit(null);

    if (tagGroupToEdit === null) {
      setProductState(
        (prev) =>
          ({
            ...prev,
            portionsTagGroups: prev?.portionsTagGroups
              ? [...prev!.portionsTagGroups, newTagGroup]
              : [newTagGroup],
          } as Product)
      );
    }

    if (tagGroupToEdit) {
      setProductState(
        (prev) =>
          ({
            ...prev,
            portionsTagGroups: prev!.portionsTagGroups.map((tagGroup) =>
              tagGroup.id === newTagGroup.id ? newTagGroup : tagGroup
            ),
          } as Product)
      );
    }

    closeTagGroupModal();
  };

  const onDeleteTagGroup = (id: number | string) => {
    setProductState(
      (prev) =>
        ({
          ...prev,
          portionsTagGroups: [
            ...prev!.portionsTagGroups.filter((tagGroup) => tagGroup.id !== id),
          ],
        } as Product)
    );
    closeTagGroupModal();
  };

  return [
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
  ] as const;
};

export default useEditProduct;
