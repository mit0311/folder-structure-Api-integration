import { IInputDir } from "./interfaceForFolders";
export interface IInitialState {
  folders: IInputDir[];
  isFolderClicked: boolean;
  isFileClicked: boolean;
  clickedFolder: string;
  clickedFolderId: string | null;
  isRootClicked: boolean;
  isFormOpen: boolean;
  isNestedSubmitted: boolean;
  idOfNestedSubmitted: string | null;
  isDataFetched: boolean;
  isFormSubmitted: boolean;
  apiError:string | null;
}
