import { BuildingDetailsDTO } from "../building";

export interface MessagingDTO {
  action: string;
  input: string;
  output: string;
  output_content?: BuildingDetailsDTO[];
  remaining_balance: number;
}
