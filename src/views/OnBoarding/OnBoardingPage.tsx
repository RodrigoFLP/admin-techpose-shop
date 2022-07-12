import { Center, Stack, Stepper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import CompleteStep from "./Steps/CompleteStep";
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ThirdStep from "./Steps/ThirdStep";

const OnBoardingPage = () => {
  const matches = useMediaQuery("(min-width: 720px)");
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Center>
      <Stack align={"center"}>
        <Stepper
          onStepClick={setActive}
          size="sm"
          active={active}
          p={"xl"}
          pb={"xs"}
          pt="3rem"
        >
          <Stepper.Step
            label={matches && "Administración"}
            description={matches && "Crea tu cuenta"}
          />
          <Stepper.Step
            label={matches && "Negocio"}
            description={matches && "Configura tu negocio"}
          />
          <Stepper.Step
            label={matches && "Usuarios"}
            description={matches && "Crea usuarios"}
          />
        </Stepper>
        <Stack>
          {active == 0 && <FirstStep onComplete={nextStep} />}
          {active == 1 && <SecondStep onComplete={nextStep} />}
          {active == 2 && <ThirdStep onComplete={nextStep} />}
          {active == 3 && <CompleteStep onComplete={nextStep} />}
        </Stack>
      </Stack>
    </Center>
  );
};

export default OnBoardingPage;
