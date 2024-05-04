export interface IInputDir {
  value: string;
  _id: string | null;
  type: string | null;
  isFile: boolean;
  parent?: string | null;
  parentId: string | null;
  children: IInputDir[];
}
