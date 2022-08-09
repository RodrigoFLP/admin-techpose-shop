import {
  ActionIcon,
  Alert,
  Button,
  Card,
  ColorSwatch,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import {
  Pin,
  ArrowBackUp,
  AlertCircle,
  X,
  Check,
  Trash,
  Plus,
} from "tabler-icons-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Area, newArea } from "../../interfaces/area";
import { showNotification, updateNotification } from "@mantine/notifications";
import {
  useCreateMutation,
  useDeleteMutation,
  useGetAllQuery,
} from "../../services/areas";
import Loading from "../../components/Loading";
import { useGetStoreQuery, useUpdateStoreMutation } from "../../services/store";

interface MarkerProps {
  areas: Area[] | null;
  newArea: newArea | null;
  addCoordinate: (lat: number, lon: number) => void;
  position: LatLngExpression | null;
  onClick: (coordinate: LatLngExpression) => void;
  removeLastCoordinate: () => void;
}

function LocationMarker({
  areas,
  newArea,
  addCoordinate,
  position,
  onClick,
}: MarkerProps) {
  const map = useMapEvents({
    click(e) {
      if (newArea) {
        addCoordinate(e.latlng.lat, e.latlng.lng);
      }
      if (!newArea) {
        onClick([e.latlng.lat, e.latlng.lng]);
      }
    },
    locationfound(e) {
      onClick([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  {
    areas &&
      console.log(
        JSON.stringify(
          areas
            .flatMap((area) => area.coordinates)
            .map((coordinate) => [coordinate.lat, coordinate.lon])
        )
      );
  }

  return (
    <>
      {!newArea && (
        <Button
          onClick={() => map.locate()}
          m="xs"
          style={{
            zIndex: "10000000",
            position: "absolute",
            right: 0,
          }}
          leftIcon={<Pin />}
        >
          Ubicar
        </Button>
      )}

      {position === null
        ? null
        : !newArea && <Marker position={position}></Marker>}
      {areas &&
        areas.map((area) => (
          <Polygon
            key={area.id}
            pathOptions={{ color: "green" }}
            positions={area.coordinates.map((c) => [c.lat, c.lon])}
          />
        ))}
      {newArea && (
        <Polygon
          pathOptions={{ color: "blue" }}
          positions={newArea.coordinates.map((c) => [c[0], c[1]])}
        />
      )}
    </>
  );
}

const AreasPage = () => {
  const {
    data: store,
    isLoading: isStoreLoading,
    isError: isErrorStore,
    isUninitialized: isStoreUninitialized,
    isSuccess: isSuccessStore,
  } = useGetStoreQuery();

  const [createArea, createResult] = useCreateMutation();

  const [removeArea, removeResult] = useDeleteMutation();

  const [updateStore, updateStoreResult] = useUpdateStoreMutation();

  const {
    data: areasResponse,
    isSuccess,
    isLoading,
    isUninitialized,
  } = useGetAllQuery();

  useEffect(() => {
    if (isSuccess) {
      setAreas(areasResponse);
    }
    if (isSuccessStore && store.lat && store.lon) {
      setPosition([store.lat, store.lon] as LatLngExpression);
    }
  }, [isSuccess, areasResponse, isSuccessStore]);

  const [areas, setAreas] = useState<Area[] | null>(null);
  const [newArea, setNewArea] = useState<null | newArea>(null);

  const [position, setPosition] = useState<null | LatLngExpression>(null);

  const addArea = () => {
    if (areas) {
      setNewArea({ inclusive: true, coordinates: [] });
    }
  };

  const addCoordinate = (lat: number, lon: number) => {
    if (newArea) {
      setNewArea((prev) => ({
        ...prev!,
        coordinates: [...prev!.coordinates, [lat, lon]],
      }));
    }
  };

  const removeLastCoordinate = () => {
    if (newArea && newArea.coordinates.length > 0) {
      setNewArea((prev) => ({
        ...prev!,
        coordinates: [
          ...prev!.coordinates.slice(0, prev!.coordinates.length - 1),
        ],
      }));
    }
  };

  const deleteArea = async (id: number) => {
    try {
      showNotification({
        id: "load-data",
        loading: true,
        title: "Eliminando área",
        message: "Se está eliminando el área",
        autoClose: false,
        disallowClose: true,
      });
      await removeArea(id).unwrap();
      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Listo",
        message: "El área ha sido eliminada con éxito",
        icon: <Check />,
        autoClose: 2000,
      });
    } catch (err) {
      updateNotification({
        id: "load-data",
        color: "red",
        title: "Error",
        message: "No se ha podido eliminar el área",
        icon: <X />,
        autoClose: 2000,
      });
    }
  };

  const saveLocation = async () => {
    try {
      if (position) {
        showNotification({
          id: "load-data",
          loading: true,
          title: "Guardando ubicación",
          message: "Se está agregando la ubicación",
          autoClose: false,
          disallowClose: true,
        });
        await updateStore({
          lat: (position as number[])[0],
          lon: (position as number[])[1],
        }).unwrap();
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Listo",
          message: "La ubicación ha sido agregada con éxito",
          icon: <Check />,
          autoClose: 2000,
        });
      }
    } catch (err) {
      updateNotification({
        id: "load-data",
        color: "red",
        title: "Error",
        message: "No se ha podido agregar el área",
        icon: <X />,
        autoClose: 2000,
      });
    }
  };

  const submitArea = async () => {
    try {
      if (newArea && newArea?.coordinates.length < 3) {
        throw new Error("error");
      }

      showNotification({
        id: "load-data",
        loading: true,
        title: "Guardando área",
        message: "Se está agregando el área",
        autoClose: false,
        disallowClose: true,
      });
      if (newArea) {
        console.log(newArea);
        await createArea({
          coordinates: [
            ...newArea.coordinates.map((coordinate) => ({
              lat: coordinate[0],
              lon: coordinate[1],
            })),
          ],
        }).unwrap();
        //mutation to API

        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Listo",
          message: "El área ha sido agregada con éxito",
          icon: <Check />,
          autoClose: 2000,
        });

        setNewArea(null);
      }
    } catch (err) {
      updateNotification({
        id: "load-data",
        color: "red",
        title: "Error",
        message: "No se ha podido agregar el área",
        icon: <X />,
        autoClose: 2000,
      });
    }
  };

  const exitEditMode = () => {
    setNewArea(null);
  };

  if (isLoading || isUninitialized || isStoreLoading || isStoreUninitialized)
    return <Loading />;

  return (
    <LayourInnerDashboard title="Áreas">
      <Group>
        <Button onClick={addArea} leftIcon={<Plus size={16} />}>
          Agregar área
        </Button>
        <Button leftIcon={<Pin size={16} />} onClick={saveLocation}>
          Guardar ubicación
        </Button>
      </Group>
      <Stack spacing="xs" mt="xs">
        {areas &&
          areas.map((area) => (
            <Card mt="0" p="xs" key={area.id} withBorder>
              <Group position="apart">
                <Group>
                  <ColorSwatch color="blue" />
                  <Text>Área {area.id}</Text>
                </Group>
                <ActionIcon onClick={() => deleteArea(area.id)} color="red">
                  <Trash size={18} />
                </ActionIcon>
              </Group>
            </Card>
          ))}
      </Stack>
      {newArea && (
        <Alert
          mt="xs"
          icon={<AlertCircle size={16} />}
          title="Estás en modo edición"
          color="blue"
        >
          <Stack>
            Haz click en el mapa para agregar puntos de la nueva área
            <Group>
              <Button onClick={submitArea}>Guardar</Button>
              <Button onClick={exitEditMode}>Salir</Button>
            </Group>
          </Stack>
        </Alert>
      )}
      <Card
        mt="xs"
        mb="xl"
        style={{
          position: "relative",
          width: "100%",
          height: "50vh",
          padding: "0",
        }}
        shadow="sm"
        radius="md"
      >
        {newArea && (
          <Button
            onClick={removeLastCoordinate}
            m="xs"
            style={{ zIndex: "1000", position: "absolute", right: 0 }}
            leftIcon={<ArrowBackUp />}
          >
            Borrar último
          </Button>
        )}
        <MapContainer
          style={{ height: "100%", width: "100%", zIndex: "10" }}
          center={
            position ||
            ([13.991018275574909, -89.56062633376027] as LatLngExpression)
          }
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker
            areas={areas}
            addCoordinate={addCoordinate}
            removeLastCoordinate={removeLastCoordinate}
            newArea={newArea}
            position={position}
            onClick={setPosition}
          />
        </MapContainer>
      </Card>
    </LayourInnerDashboard>
  );
};

export default AreasPage;
