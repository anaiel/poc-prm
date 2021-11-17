import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { data, dependencyTree, initialDeactivations } from "./mock-data";
import Toggle from "./Toggle";
import { deactivationsToFormData, formDataToDeactivations } from "./utils";

function App() {
  const { reset, handleSubmit, setValue, control, watch } = useForm({
    defaultValues: deactivationsToFormData(data, initialDeactivations, dependencyTree),
  });

  const onSubmit = (formdata: any) => {
    console.log(formDataToDeactivations(data, formdata));
  };

  // Handle dependencies
  useEffect(() => {
    const sub = watch((value, { name }) => {
      if (!name || !dependencyTree[name]) return;

      dependencyTree[name].forEach((item) =>
        setValue(item, value[name] === "active" ? "active" : "consequence")
      );
    });
    return () => {
      sub.unsubscribe();
    };
  }, [watch, setValue]);

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <div>
        {data.modules.map((module) => (
          <Module key={module}>
            <span>{module}</span>
            <Controller
              control={control}
              name={module}
              render={({ field: { value } }) => (
                <Toggle
                  isSelected={value === "active"}
                  onChange={(isSelected) => {
                    setValue(module, isSelected ? "active" : "deactivated");
                  }}
                  disabled={value === "consequence"}
                />
              )}
            />
          </Module>
        ))}
      </div>

      <div>
        {data.objectives.map((objective) => (
          <Objective key={objective}>
            <span>{objective}</span>
            <Controller
              control={control}
              name={objective}
              render={({ field: { value } }) => (
                <Toggle
                  isSelected={value === "active"}
                  onChange={(isSelected) => {
                    setValue(objective, isSelected ? "active" : "deactivated");
                  }}
                  disabled={value === "consequence"}
                />
              )}
            />
          </Objective>
        ))}
      </div>

      <div>
        {data.activities.map((activity) => (
          <Activity key={activity}>
            <span>{activity}</span>
            <Controller
              control={control}
              name={activity}
              render={({ field: { value } }) => (
                <Toggle
                  isSelected={value === "active"}
                  onChange={(isSelected) => {
                    setValue(activity, isSelected ? "active" : "deactivated");
                  }}
                  disabled={value === "consequence"}
                />
              )}
            />
          </Activity>
        ))}
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
                (item) => setValue(item, "active")
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
