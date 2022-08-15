import { ActionIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import Loading from "../../components/Loading";
import { useGetOneTagMutation } from "../../services/tags";
import TagForm from "./TagForm";

const EditTagsPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[4];

  const [getTag, result] = useGetOneTagMutation();

  useEffect(() => {
    if (id) {
      getTag(id).unwrap();
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
      title={result.data ? ` Tag ${result.data.id}` : "Nueva tag"}
      leftAction={
        <Link to="/dashboard/tags">
          <ActionIcon>
            <ArrowLeft />
          </ActionIcon>
        </Link>
      }
    >
      <TagForm tag={id ? result.data : undefined} />
    </LayourInnerDashboard>
  );
};

export default EditTagsPage;
