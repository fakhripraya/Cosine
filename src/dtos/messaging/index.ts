import { BuildingDetailsDTO } from "../building";

export interface MessagingDTO {
  input: string;
  output: string;
  output_content?: BuildingDetailsDTO[];
  remaining_balance: number;
}
