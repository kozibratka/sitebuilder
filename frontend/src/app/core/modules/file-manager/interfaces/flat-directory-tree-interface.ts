import {DirectoryTreeInterface} from './directory-tree-interface';

export interface FlatDirectoryTreeInterface extends DirectoryTreeInterface{
  expandable: boolean;
  level: number;
}
