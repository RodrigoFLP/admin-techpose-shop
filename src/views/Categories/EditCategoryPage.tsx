import { ActionIcon } from "@mantine/core";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import Loading from "../../components/Loading";
import { useGetOneCategoryQuery } from "../../services/categories";
import CategoryForm from "./CategoryForm";

const EditCategoriesPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const [image, setImage] = useState<null | File>(null);

  const {
    data: category,
    isLoading,
    isUninitialized,
    isError,
  } = useGetOneCategoryQuery(id);

  if (isLoading || isUninitialized) {
    return <Loading />;
  }

  if (isError) {
    return <div>"Error"</div>;
  }

  return (
    <LayourInnerDashboard
      title={`Categoría ${category.id}`}
      leftAction={
        <Link to="/dashboard/categorias">
          <ActionIcon>
            <ArrowLeft />
          </ActionIcon>
        </Link>
      }
    >
      <CategoryForm category={category} />
    </LayourInnerDashboard>
  );
};

export default EditCategoriesPage;
