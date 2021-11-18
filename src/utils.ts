import { Data, Deactivations, DependencyTree, FormData } from "./interfaces";

export const deactivationsToFormData = (
  data: Data,
  deactivations: Deactivations
): FormData => {
  const formData: FormData = {};
  data.modules.forEach((module) => {
    formData[module] = !deactivations.modules.includes(module);
  });
  data.objectives.forEach((objective) => {
    formData[objective] = !deactivations.objectives.includes(objective);
  });
  data.activities.forEach((activity) => {
    formData[activity] = !deactivations.activities.includes(activity);
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
    if (!formData[module]) deactivations.modules.push(module);
  });
  data.objectives.forEach((objective) => {
    if (!formData[objective]) deactivations.objectives.push(objective);
  });
  data.activities.forEach((activity) => {
    if (!formData[activity]) deactivations.activities.push(activity);
  });
  return deactivations;
};

export const getAncestors = (
  dependencyTree: DependencyTree,
  item: string
): string[] => {
  let ancestors: string[] = [];
  Object.keys(dependencyTree).forEach((possibleAncestor) => {
    if (dependencyTree[possibleAncestor].includes(item))
      ancestors = [
        ...ancestors,
        possibleAncestor,
        ...getAncestors(dependencyTree, possibleAncestor),
      ];
  });
  return ancestors
    .sort()
    .filter((item, index, arr) => index === 0 || arr[index - 1] !== item);
};
