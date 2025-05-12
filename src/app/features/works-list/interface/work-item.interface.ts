export interface IWorkItem {
  id: number;
  name: string;
  points: number;
  repeat: number[];
  days?: IDayOfTheWeek[];
}

export interface IDaysOfTheWeek {
  name: string;
  completed: boolean;
  days?: IDayOfTheWeek[];
}

export interface IDayOfTheWeek {
  name: string;
  completed: boolean;
}
