import { Button, Grid, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Check, FileCheck, X } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import Loading from "../../components/Loading";
import { PreferenceFormValues, StoreMutation } from "../../interfaces/store";
import { useGetStoreQuery, useUpdateStoreMutation } from "../../services/store";
import { useGetAllTagsQuery } from "../../services/tags";
import PreferencesForm from "./PreferencesForm";

const PreferencesPage = () => {
  const {
    data: store,
    isLoading,
    isUninitialized,
    isError,
    isSuccess,
  } = useGetStoreQuery();

  const {
    data: tags,
    isSuccess: isTagsSuccess,
    isLoading: isTagsLoading,
    isError: isTagsError,
    isUninitialized: isTagsUnintialized,
  } = useGetAllTagsQuery();

  const [update, result] = useUpdateStoreMutation();

  const updatePreferences = async (values: StoreMutation) => {
    try {
      showNotification({
        id: "load-data",
        loading: true,
        title: "Guardando cambios",
        message: "Se están actualizando las preferencias",
        autoClose: false,
        disallowClose: true,
      });
      await update({
        ...values,
        deliveryCost: parseFloat(values.deliveryCost as string),
        deliveryMin: parseFloat(values.deliveryMin as string),
      }).unwrap();

      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Listo",
        message: "Las preferencicas han sido actualizado con éxito",
        icon: <Check />,
        autoClose: 2000,
      });
    } catch (err) {
      updateNotification({
        id: "load-data",
        color: "red",
        title: "Error",
        message:
          "No se han podido actualizar la preferencias, intenta de nuevo",
        icon: <X />,
        autoClose: 2000,
      });
    }
  };

  if (isLoading || isUninitialized || isTagsLoading || isTagsUnintialized)
    return <Loading />;

  if (isError || isTagsError) return <div>Hay un error</div>;

  return (
    <LayourInnerDashboard title="Preferencias">
      <PreferencesForm {...store} onSave={updatePreferences} tags={tags} />
    </LayourInnerDashboard>
  );
};

export default PreferencesPage;
