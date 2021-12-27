export interface Prediction {
  current: string[];
  deep: string[];
}

export interface Root {
  predictions: Prediction;
  children?: Record<string, unknown>;
}
