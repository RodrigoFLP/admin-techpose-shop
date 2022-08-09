import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Check, X } from "tabler-icons-react";
import { Portion, Product, TagGroup } from "../interfaces";
import { useGetAllCategoriesQuery } from "../services/categories";
import {
  useAddProductMutation,
  useGetMutation,
  useUpdateProductMutation,
} from "../services/products";
import { uploadImage } from "../utils/uploadImage";

interface initialValues {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}

const useEditProduct = () => {
  const [image, setImage] = useState<null | File>(null);

  const location = useLocation();
  const id = location.pathname.split("/")[4];

  const [getProduct, productResult] = useGetMutation();

  const [updateProduct, updateResult] = useUpdateProductMutation();

  const [addProduct, addResult] = useAddProductMutation();

  const fetchProduct = async (id: string) => {
    try {
      const result = await getProduct(id).unwrap();
      setProductState(result);
      form.setValues({
        id: result.id,
        title: result.name,
        description: result.description,
        category: `${result.categories[0].id}`,
        price:
          typeof result.price !== "number"
            ? parseFloat(result.price)
            : result.price,
      });
    } catch (error) {
      throw error;
    }
  };

  const newProduct = async () => {
    try {
      setProductState({
        id: 0,
        categories: [],
        description: "",
        image: null,
        name: "",
        portions: [],
        portionsTagGroups: [],
        price: 0,
        tags: [],
        createdAt: "",
        updatedAt: "",
      });
      form.setValues({
        id: 0,
        title: "",
        description: "",
        category: "",
        price: 0,
      });
    } catch (e) {
      throw new Error("No se ha podido fetchear");
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
    if (!id) {
      newProduct();
    }
  }, []);

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

      if (id) {
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
        }).unwrap();
      }

      if (!id) {
        await addProduct({
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
        }).unwrap();
      }

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
        id: "load-product",
        color: "red",
        title: "Error",
        message: "No se ha podido realizar la acción",
        icon: <X />,
        autoClose: 2000,
      });
    }
  };

  const form = useForm({
    initialValues: {
      id: 0,
      title: "",
      description: "",
      category: "",
      price: 0,
    },
  });

  const [productState, setProductState] = useState<Product | null>(null);

  const [portionToEdit, setPortionToEdit] = useState<Portion | null>(null);

  const [tagGroupToEdit, setTagGroupToEdit] = useState<TagGroup | null>(null);

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

  const isLoading =
    (productResult.isLoading ||
      productResult.isUninitialized ||
      isCategoriesLoading ||
      isCategoriesUnintialized) &&
    id;

  const isError = productResult.isError || isCategoriesError;

  const isNewProduct = !!id;

  return [
    productState,
    categories,
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
  ] as const;
};

export default useEditProduct;
