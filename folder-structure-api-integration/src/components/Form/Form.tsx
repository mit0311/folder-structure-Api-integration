import { useState } from "react";
import "../Form/Form.scss";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { v4 as uuid } from "uuid";
import fileImage from "../../assests/fileImage.svg";
import folderImage from "../../assests/folderImage.svg";
import { IInputDir } from "../../interface/interfaceForFolders";
import { IInitialState } from "../../interface/interfaceForInitialState";
import axios from "axios";

function Form() {
  const [inputName, setInputName] = useState<IInputDir>({
    value: "",
    type: "",
    isFile: false,
    parentId: "",
    _id: "",
    children: [],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const isFileClicked = useSelector(
    (state: IInitialState) => state.isFileClicked
  );
  const clickedFolderId = useSelector(
    (state: IInitialState) => state.clickedFolderId
  );
  const foldersData: IInputDir[] = useSelector(
    (state: IInitialState) => state.folders
  );
  const isRootClicked = useSelector(
    (state: IInitialState) => state.isRootClicked
  );

  const uniqueId = uuid();
  const dispatch = useDispatch();
  const handleDirNameChange = (e: any) => {
    setInputName((prevState: IInputDir) => ({
      ...prevState,
      value: e.target?.value,
      _id: uniqueId,
      type: isFileClicked ? "file" : "folder",
      parentId: clickedFolderId,
      isFile: isFileClicked,
    }));
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (inputName?.value?.length === 0) {
      if (isFileClicked) {
        setErrorMessage("File name is required");
      } else {
        setErrorMessage("Folder name is required");
      }
    } else {
      dispatch({ type: "formSubmitted", value: true });
      dispatch({ type: "setisFormOpen", value: false });
      isRootClicked
        ? axios
            .post(
              "https://folder-structure-api.onrender.com/initialize-root/",
              {
                value: inputName?.value,
              }
            )
            .then((response) => {
              dispatch({ type: "addfolders", value: response?.data });
            })
            .catch((error) => {
              dispatch({ type: "setApiError", value: error?.message });
            })
        : axios
            .post("https://folder-structure-api.onrender.com/", {
              value: inputName.value,
              type: isFileClicked ? "file" : "folder",
              parent: inputName.parentId,
            })
            .then((response) => {
              dispatch({ type: "addfolders", value: response?.data });
            })
            .catch((error) => {
              dispatch({ type: "setApiError", value: error?.message });
            });
      dispatch({
        type: "setIsClickedRightInNested",
        value: { isClicked: false, _id: null },
      });

      setInputName(
        (prevState: IInputDir): IInputDir => ({
          ...prevState,
          value: "",
        })
      );
    }
  };

  const handleFormCancel = () => {
    dispatch({
      type: "setIsClickedRightInNested",
      value: { isClicked: false, _id: null },
    });
    dispatch({ type: "setisFormOpen", value: false });
  };

  return (
    <>
      <div
        className="folderContainer"
        style={{ margin: (foldersData?.length || 0) === 0 ? "10px" : "" }}
      >
        <form
          className="folderForm"
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        >
          <img
            src={isFileClicked ? fileImage : folderImage}
            className="folderImage"
          />
          <input
            type="text"
            className="inputForFolder"
            value={inputName.value}
            onChange={handleDirNameChange}
          />
          <CheckOutlinedIcon
            fontSize="small"
            className="rightMark"
            onClick={(e) => {
              handleFormSubmit(e);
            }}
          />
          <ClearOutlinedIcon
            fontSize="small"
            className="cancelMark"
            onClick={handleFormCancel}
          />
        </form>
        {errorMessage.length > 0 && (
          <span className="error">{errorMessage}</span>
        )}
      </div>
    </>
  );
}

export default Form;
