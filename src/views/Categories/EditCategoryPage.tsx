import { ActionIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import Loading from "../../components/Loading";
import { useGetOneCategoryMutation } from "../../services/categories";
import CategoryForm from "./CategoryForm";

const EditCategoriesPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[4];

  const [getCategory, result] = useGetOneCategoryMutation();

  useEffect(() => {
    if (id) {
      getCategory(id).unwrap();
    }
  }, []);

  if ((result.isLoading || result.isUninitialized) && !!id) {
    return <Loading />;
  }

  if (result.isError) {
    return <div>"Error"</div>;
  }

  return (
    <LayourInnerDashboard
      title={result.data ? ` Categoría ${result.data.id}` : "Nueva categoría"}
      leftAction={
        <Link to="/dashboard/categorias">
          <ActionIcon>
            <ArrowLeft />
          </ActionIcon>
        </Link>
      }
    >
      <CategoryForm category={id ? result.data : undefined} />
    </LayourInnerDashboard>
  );
};

export default EditCategoriesPage;
