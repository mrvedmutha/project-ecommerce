export interface ITax {
  _id?: string;
  taxClass: string;
  taxName: string;
  taxRate: number;
  priority: number;
  countryCode: string;
  stateCode: string;
}
