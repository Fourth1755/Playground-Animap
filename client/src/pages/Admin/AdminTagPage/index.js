import { useState, useEffect } from 'react';
import "./index.scss";
import AdminTagTable from "../../../components/table/AdminTagTable";
import AdminTagAnimeTable from '../../../components/table/AdminTagAnimeTable';
import AdminTagModal from "../../../components/modal/AdminTagModal";
import { useGetAllTagQuery }from '../../../services/tag'
import { useGetAllAnimesQuery } from '../../../services/anime'
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
    const { data:tag, error:errorTag, isLoading } = useGetAllTagQuery()
    const { data:anime, error:errorAnime, isLoading:isLoadingAnime } = useGetAllAnimesQuery()
    return (
        <div>
            <div className="adminAnimeTag-header">
                <h1>Manage Tag Anime</h1>
            </div>
            <div className="adminAnimeTag-container">
                <div className="adminAnimeTag-container-table2">
                    <div className="adminAnimeTag-container-header">
                    <h2>Anime</h2>
                    </div>
                    {errorAnime ? (
                        <>Oh no, there was an error</>
                    ) : isLoadingAnime ? (
                        <>Loading...</>
                    ) : anime ? (
                        <AdminTagAnimeTable Dataanime = {anime}/>
                    ) : null}
                </div>
                <div className="adminAnimeTag-container-table1">
                    <div className="adminAnimeTag-container-header">
                    <h2>Tag</h2>
                        <button onClick={() => handleOpenModalTag([], "create")}>Add Tag</button> 
                    </div>
                    {errorTag ? (
                        <>Oh no, there was an error</>
                    ) : isLoading ? (
                        <>Loading...</>
                    ) : tag ? (
                        <AdminTagTable TagAnime = {tag}/>
                    ) : null}
                </div>
            </div>
            {/* <AdminTagModal open={openTag} onClose={handleCloseModalTag} tag={modalTag} mode={modalModeTag}/> */}
        </div>
    );
};
export default AdminTagPage;