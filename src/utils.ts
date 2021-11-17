import { Data, Deactivations, DependencyTree, FormData } from "./interfaces";

export const deactivationsToFormData = (
  data: Data,
  deactivations: Deactivations,
  dependencyTree: DependencyTree
): FormData => {
  const formData: FormData = {};
  data.modules.forEach((module) => {
    formData[module] = deactivations.modules.includes(module)
      ? "deactivated"
      : "active";
  });
  data.objectives.forEach((objective) => {
    formData[objective] = deactivations.objectives.includes(objective)
      ? "deactivated"
      : "active";
  });
  data.activities.forEach((activity) => {
    formData[activity] = deactivations.activities.includes(activity)
      ? "deactivated"
      : "active";
  });

  Object.keys(dependencyTree).forEach((item) => {
    if (formData[item] === "deactivated")
      dependencyTree[item].forEach(
        (itemToDisable) => (formData[itemToDisable] = "consequence")
      );
  });
  return formData;
};

export const formDataToDeactivations = (
  data: Data,
  formData: FormData
): Deactivations => {
  const deactivations: Deactivations = {
    modules: [],
    objectives: [],
    activities: [],
  };
  data.modules.forEach((module) => {
    if (formData[module] === "deactivated") deactivations.modules.push(module);
  });
  data.objectives.forEach((objective) => {
    if (formData[objective] === "deactivated")
      deactivations.objectives.push(objective);
  });
  data.activities.forEach((activity) => {
    if (formData[activity] === "deactivated")
      deactivations.activities.push(activity);
  });
  return deactivations;
};
