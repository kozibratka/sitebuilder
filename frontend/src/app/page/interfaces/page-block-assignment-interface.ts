import {PageBlockInterface} from "./page-block-interface";

export interface PageBlockAssignmentInterface {
  pageBlock: PageBlockInterface;
  orderItem: number;
  uniqueId?: string;
}
