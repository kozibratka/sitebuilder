export interface MenuItemInterface {
  name: string;
  level: number;
  pageId?: number;
  pageDetail: {pageUrl: string, isHomepage: boolean};
  type: "Block" | "Page";
  uniqueId?: string;
}
