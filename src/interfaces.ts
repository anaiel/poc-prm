export interface Data {
  modules: string[];
  objectives: string[];
  activities: string[];
}

export type Deactivations = Data;

export interface FormData {
  [key: string]: boolean;
}

export interface DependencyTree {
  [item: string]: string[];
}
