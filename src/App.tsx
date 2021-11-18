import { useForm } from "react-hook-form";
import styled from "styled-components";
import { data, dependencyTree, initialDeactivations } from "./mock-data";
import Toggle from "./Toggle";
import {
  deactivationsToFormData,
  formDataToDeactivations,
  getAncestors,
} from "./utils";

function App() {
  const { reset, handleSubmit, setValue, control, watch } = useForm({
    defaultValues: deactivationsToFormData(data, initialDeactivations),
  });

  const onSubmit = (formdata: any) => {
    console.log(formDataToDeactivations(data, formdata));
  };

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <div>
        {data.modules.map((module) => (
          <Module key={module}>
            <span>{module}</span>
            <Toggle
              control={control}
              name={module}
              disabled={watch(getAncestors(dependencyTree, module)).some(
                (value) => value === false
              )}
            />
          </Module>
        ))}
      </div>

      <div>
        {data.objectives.map((objective) => (
          <Objective key={objective}>
            <span>{objective}</span>
            <Toggle
              control={control}
              name={objective}
              disabled={watch(getAncestors(dependencyTree, objective)).some(
                (value) => value === false
              )}
            />
          </Objective>
        ))}
      </div>

      <div>
        {data.activities.map((activity) => {
          return (
            <Activity key={activity}>
              <span>{activity}</span>
              <Toggle
                control={control}
                name={activity}
                disabled={watch(getAncestors(dependencyTree, activity)).some(
                  (value) => value === false
                )}
              />
            </Activity>
          );
        })}
      </div>

      <ControlsWrapper>
        <input type="submit" />

        <button
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>

        <button
          onClick={() => {
            Object.keys(data).forEach((lvl) => {
              data[lvl as "modules" | "objectives" | "activities"].forEach(
                (item) => setValue(item, true)
              );
            });
          }}
        >
          Activate all
        </button>
      </ControlsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Item = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  border: 1px black solid;
  margin: 15px;
`;

const Module = styled(Item)`
  height: 480px;
`;

const Objective = styled(Item)`
  height: 150px;
`;

const Activity = styled(Item)`
  height: 40px;
`;

const ControlsWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
`;

export default App;
