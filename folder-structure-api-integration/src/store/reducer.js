import { createStore } from "redux";
const initialState = {
  folders: [],
  isFolderClicked: false,
  isFileClicked: false,
  clickedFolder: "",
  clickedFolderId: null,
  isRootClicked: false,
  isFormOpen: false,
  isNestedSubmitted: false,
  idOfNestedSubmitted: null,
  isDataFetched: false,
  isFormSubmitted: false,
  apiError: "",
};

const folderReducer = (state = initialState, action) => {
  if (action.type === "showFolders") {
    return {
      ...state,
      folders: [...action.value],
      isFormSubmitted:false,
      isDataFetched: false,
      isFormSubmitted: false,
    };
  }
  if (action.type === "addfolders") {
    return {
      ...state,
      folders: action.value,
      apiError: "",
      isFormSubmitted: false,
      isFormOpen: false,
      isFileClicked: false,
      isFolderClicked: false,
      isRootClicked: false,
    };
  }
  if (action.type === "setRemoveFolder") {
    return {
      ...state,
      folders: action.value,
      isFormSubmitted: false,
      isFormOpen: false,
      isFileClicked: false,
      isFolderClicked: false,
    };
  }
  if (action.type === "fileClicked") {
    return {
      ...state,
      isFileClicked: action.value,
    };
  }
  if (action.type === "folderClicked") {
    return {
      ...state,
      isFolderClicked: action.value,
    };
  }

  if (action.type === "clickedFolderName") {
    return {
      ...state,
      clickedFolder: action.value.name,
      clickedFolderId: action.value.id,
    };
  }

  if (action.type === "isRootClicked") {
    return {
      ...state,
      isRootClicked: action.value,
    };
  }
  if (action.type === "setisFormOpen") {
    let temp = {
      ...state,
      isFormOpen: action.value,
    };
    return temp;
  }

  if (action.type === "setIsClickedRightInNested") {
    return {
      ...state,
      isNestedSubmitted: action.value.isClicked,
      idOfNestedSubmitted: action.value.id,
      isFileClicked: false,
      isFolderClicked: false,
    };
  }
  if (action.type === "formSubmitted") {
    return {
      ...state,
      isFormSubmitted: action.value,
    };
  }
  if (action.type === "setApiError") {
    return {
      ...state,
      apiError: action.value,
    };
  }

  return state;
};

const store = createStore(folderReducer);

export default store;
