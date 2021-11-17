export interface Data {
  modules: string[];
  objectives: string[];
  activities: string[];
}

export type Deactivations = Data;

export interface FormData {
  [key: string]: "active" | "deactivated" | "consequence";
}

export interface DependencyTree {
  [item: string]: string[];
}
