export interface IProductDimension {
  dimension: {
    length: number;
    breath: number;
    height: number;
    measurement: string;
  };
  weight: {
    value: number;
    measurement: string;
  };
}
