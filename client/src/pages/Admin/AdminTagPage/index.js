import { useState, useEffect } from 'react';
import "./index.scss";
import AdminTagTable from "../../../components/table/AdminTagTable";
import AdminTagModal from "../../../components/modal/AdminTagModal";
import AdminTableTagAnime from "../../component/AdminTableTagAnime";


const AdminTagPage = () => {
    const [modalTag, setModalTag] = useState()
    const [modalModeTag, setModalModeTag] = useState('')
    const [openTag, setOpenTag] = useState(false);
    const handleCloseModalTag = () =>setOpenTag(false);
    const handleOpenModalTag = (item, mode) => {
        setModalModeTag(mode);
        if (mode == "edit") {
            setModalTag(item)
        }
        setOpenTag(true);
    }
  return (
    <div>
        <div className="adminAnime-header">
            <h1>Manage Tag Anime</h1>
        </div>
        <div className="adminAnimeTag-container">
            <div className="adminAnimeTag-container-table1">
                <div className="adminAnimeTag-container-header">
                   <h2>Tag</h2>
                    <button onClick={() => handleOpenModalTag([], "create")}>Add Tag</button> 
                </div>
                <AdminTagTable />
            </div>
            <div className="adminAnimeTag-container-table2">
                <div className="adminAnimeTag-container-header">
                   <h2>Tag Anime</h2>
                </div>
                {/* <AdminTableTagAnime/> */}
            </div>
        </div>
        {/* <AdminTagModal open={openTag} onClose={handleCloseModalTag} tag={modalTag} mode={modalModeTag}/> */}
    </div>
  );
};
export default AdminTagPage;