export interface IUpdateCardServiceDTO {
  status: string;
  title: string;
  description: string;
  id: string;
  category_ids?: string[];
}
