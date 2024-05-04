import "./App.scss";
import Form from "./components/Form/Form";
import { useEffect, useState } from "react";
import Folders from "./components/ShowFolders/Folders";
import { useDispatch, useSelector } from "react-redux";
import { IInputDir } from "./interface/interfaceForFolders";
import { IInitialState } from "./interface/interfaceForInitialState";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const foldersData: IInputDir[] = useSelector(
    (state: IInitialState) => state.folders
  );
  const isFormSubmitted: boolean = useSelector(
    (state: IInitialState) => state.isFormSubmitted
  );
  const isFormOpen = useSelector((state: IInitialState) => state.isFormOpen);
  const apiError = useSelector((state: IInitialState) => state.apiError);
  const [isDataRendered, setIsDataRendered] = useState<boolean>(false);

  useEffect(() => {
    if (apiError) {
      toast(apiError);
    }
  }, [apiError]);

  const handleClickForAddFolder = () => {
    dispatch({ type: "setisFormOpen", value: true });
    dispatch({ type: "isRootClicked", value: true });
  };

  useEffect(() => {
    dispatch({ type: "formSubmitted", value: true });
    axios.get("https://folder-structure-api.onrender.com/").then((response) => {
      dispatch({ type: "showFolders", value: response.data });
      setIsDataRendered(true);
    });
  }, []);

  return (
    <>
      <div className="main-container">
        <h1 className="header">FOLDER STRUCTURE</h1>
        <ToastContainer />
        <button
          className="rootButton"
          type="submit"
          onClick={handleClickForAddFolder}
        >
          Add folder to root
        </button>
        {isFormSubmitted && (
          <Box className="loader">
            <CircularProgress />
          </Box>
        )}
        {foldersData?.length > 0 ? (
          <Folders foldersData={foldersData} />
        ) : (
          isDataRendered &&
          !isFormSubmitted && <p className="noRecords">No Folders Found!</p>
        )}
        {isFormOpen && <Form />}
      </div>
    </>
  );
}

export default App;
