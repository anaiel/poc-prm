import { Data, Deactivations, DependencyTree } from "./interfaces";

export const data: Data = {
  modules: ["A"],
  objectives: ["A 1", "A 2", "A 3"],
  activities: [
    "A 1 a",
    "A 1 b",
    "A 1 c",
    "A 2 a",
    "A 2 b",
    "A 2 c",
    "A 3 a",
    "A 3 b",
    "A 3 c",
  ],
};

export const dependencyTree: DependencyTree = {
  "A 1": ["A 1 b"],
  "A 1 b": ["A 3", "A 2 c", "A 1 a", "A 3 b", "A 3 c"],
};

export const initialDeactivations: Deactivations = {
  modules: [],
  objectives: [],
  activities: ["A 1 b"],
};
