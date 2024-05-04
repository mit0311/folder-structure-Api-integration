import FolderStructure from "../Structure/folderStructure";
import { IInputDir } from "../../interface/interfaceForFolders";

const Folders = (props: { foldersData: IInputDir[] }) => {
  const { foldersData } = props;
  return (
    <>
      {foldersData?.map((folder: IInputDir, index: number) => {
        return (
          <ul key={index}>
            <li style={{ listStyle: "none" }}>
              <FolderStructure
                folderName={folder?.value}
                folderId={folder?._id}
                isFile={folder?.type === "file"}
              />
              {(folder?.children?.length || 0) > 0 && (
                <Folders foldersData={folder?.children} />
              )}
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default Folders;
