import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useGetAllTagQuery }from '../../../services/tag'
import { useSelector, useDispatch } from "react-redux";

const AdminTagAnimeModal = (props) => {
  const { open, onClose, anime, mode } = props;
  const MySwal = withReactContent(Swal);
  const [selectTag, setSelectTag] = useState("");
  const dispatch = useDispatch();
  const { data:Tag, error:errorTag, isLoading:isLoadingTag } = useGetAllTagQuery()
  const onChangItem = (name) => (event) => {
    setSelectTag(event.target.value);
  };
  const submitFormTag = () => {
      onClose();
      axios
        .post(`http://localhost:5000/tagDetails`, {
            tagDetails_tags_id:selectTag,
            tagDetails_animes_id:anime.animes_id,
        })
        .then((response) => {
          MySwal.fire("Alert", "บันทึกข้อมูลเรียบร้อย", "success");
          setSelectTag("")
        })
        .catch((error) => {
          MySwal.fire("Alert", error, "error");
        });
  };
  const TagAnime = useSelector((state) => state.tagAnimeList);
  const [animeModal, setAnimeModal] = useState(anime);
  useEffect(() => {
    if (open) {
      setAnimeModal(anime);
      console.log(anime.animes_id);
    } else {
      setAnimeModal([]);
    }
  }, [open]);
  return (
    <div className="modal-body">
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-body"
      >
        <div className="modal-addanime-modalStyles">
          <h1>Add New Tag Anime</h1>
          <div className="modal-addanime-container">
            <h1>{anime.animes_name}</h1>
            <FormControl
            fullWidth
              sx={{
                mb: 3,
              }}
            >
              <h3>Tag</h3>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                required
                value={selectTag}
                name="selectTag"
                onChange={onChangItem("selectTag")}
              >
                {Tag.map((item) => (
                  <MenuItem value={item.tags_id} key={item.tags_name}>
                    {item.tags_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="modal-addanime-container-bottom">
            <button onClick={submitFormTag}>
              Add New
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default AdminTagAnimeModal;