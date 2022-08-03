import {
  ActionIcon,
  Alert,
  Button,
  Card,
  ColorSwatch,
  Container,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import {
  FileCheck,
  Pin,
  Space,
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
  Popup,
  useMapEvents,
} from "react-leaflet";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { mockAreas } from "../../mocks/areas";
import { Area, newArea } from "../../interfaces/area";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useGetAllQuery } from "../../services/areas";
import Loading from "../../components/Loading";

const purpleOptions = { color: "blue" };

interface MarkerProps {
  areas: Area[] | null;
  newArea: newArea | null;
  addCoordinate: (lat: number, lon: number) => void;
  removeLastCoordinate: () => void;
}

function LocationMarker({ areas, newArea, addCoordinate }: MarkerProps) {
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  const map = useMapEvents({
    click(e) {
      if (newArea) {
        addCoordinate(e.latlng.lat, e.latlng.lng);
      }
      if (!newArea) {
        setPosition(e.latlng);
      }
    },
    locationfound(e) {
      setPosition(e.latlng);
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
  const position = [13.710281977060092, -89.21245856024711] as LatLngExpression;

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
  }, [isSuccess]);

  const [areas, setAreas] = useState<Area[] | null>(null);
  const [newArea, setNewArea] = useState<null | newArea>(null);

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

  const deleteArea = (id: number) => {
    //mutation API delete area
    showNotification({
      id: "load-data",
      loading: true,
      title: "Eliminando área",
      message: "Se está eliminando el área",
      autoClose: false,
      disallowClose: true,
    });

    //mutation to API
    setTimeout(() => {
      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Listo",
        message: "El área ha sido eliminada con éxito",
        icon: <Check />,
        autoClose: 2000,
      });
      setNewArea(null);
    }, 2000);
  };

  const submitArea = () => {
    if (newArea && newArea?.coordinates.length < 3) {
      showNotification({
        id: "load-data",
        color: "red",
        icon: <X size={18} />,
        title: "No hay puntos suficientes",
        message: "Se necesita un mínimo de 3 coordenadas",
        autoClose: 2000,
      });
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
      //mutation to API
      setTimeout(() => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Listo",
          message: "El área ha sido agregada con éxito",
          icon: <Check />,
          autoClose: 2000,
        });
        setNewArea(null);
      }, 2000);
    }
  };

  const exitEditMode = () => {
    setNewArea(null);
  };

  if (isLoading || isUninitialized) return <Loading />;

  return (
    <LayourInnerDashboard title="Áreas">
      <Group>
        <Button onClick={addArea} leftIcon={<Plus size={16} />}>
          Agregar área
        </Button>
        <Button leftIcon={<Pin size={16} />}>Cambiar ubicación</Button>
      </Group>
      <Stack>
        {areas &&
          areas.map((area) => (
            <Card mt="xs" p="xs" key={area.id} withBorder>
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
          center={position}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker
            areas={areas}
            addCoordinate={addCoordinate}
            removeLastCoordinate={removeLastCoordinate}
            newArea={newArea}
          />
        </MapContainer>
      </Card>
    </LayourInnerDashboard>
  );
};

export default AreasPage;
