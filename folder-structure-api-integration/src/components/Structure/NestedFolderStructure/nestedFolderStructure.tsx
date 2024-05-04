import "../NestedFolderStructure/nestedFolderStructure.scss";
import Form from "../../Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { IInitialState } from "../../../interface/interfaceForInitialState";

function NestedFolderStructure() {
  const dispatch = useDispatch();
  const isFileClicked = useSelector(
    (state: IInitialState) => state.isFileClicked
  );
  const isFolderClicked = useSelector(
    (state: IInitialState) => state.isFolderClicked
  );

  const fileClickHandler = () => {
    dispatch({ type: "fileClicked", value: true });
  };
  const folderClickHandler = () => {
    dispatch({ type: "folderClicked", value: true });
  };
  return (
    <div className="verticleLineForNested">
      <div className="horizontalEleForNested">
        <hr />{" "}
        {!isFileClicked && !isFolderClicked && (
          <>
            <button type="submit" onClick={fileClickHandler}>
              File
            </button>
            <button type="submit" onClick={folderClickHandler}>
              Folder
            </button>
          </>
        )}
        {(isFileClicked || isFolderClicked) && <Form />}
      </div>
    </div>
  );
}

export default NestedFolderStructure;
