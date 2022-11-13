import Modal from "@mui/material/Modal";
import "./index.scss";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector, useDispatch } from 'react-redux'

const AdminTagModal = (props) => {
  const { open, onClose, tag, mode } = props;
  const MySwal = withReactContent(Swal)
  const [tagName, setTagName] = useState();
  const [tagUniverse, setTagUnivers] = useState(false);
  const [tagWallpaper, setTagWallpaper] = useState("");
  const dispatch = useDispatch()
  const onChangItem = (name) => (event) => {
    if (name == "tagName") {
      setTagName(event.target.value);
      console.log(event.target.value)
    } else if (name == "tagUniverse") {
      setTagUnivers(event.target.value);
      console.log(event.target.value)
    } else if (name == "tagWallpaper") {
      setTagWallpaper(event.target.value);
      console.log(event.target.value)
    }
  };
  useEffect(() => {
    if (mode == "edit") {
      setTagName(tag.tags_name);
      setTagUnivers(tag.tags_universe_status);
      setTagWallpaper(tag.tags_wallpaper);
    } else if (mode == "create") {
      setTagUnivers(false);
      setTagWallpaper("-")
    }
  }, [mode, open]);
  const submitFormTag = () => {
    console.log(tagName);
    console.log(tagUniverse);
    console.log(tagWallpaper);
    if (mode == "create") {
      onClose()  
      axios
        .post(`http://localhost:5000/tags`, {
            tags_name:tagName,
            tags_universe_status:tagUniverse,
            tags_wallpaper:tagWallpaper
        })
        .then((response) => {
            MySwal.fire("Alert", "บันทึกข้อมูลเรียบร้อย", "success");
            //dispatch(fetchTagAsync())
            setTagName("")
            setTagUnivers(false)
            setTagWallpaper("-")
        })
        .catch((error) => {
            MySwal.fire("Alert", error, "error");
            setTagName("")
            setTagUnivers(false)
            setTagWallpaper("-")
        });
    } else {
        onClose()
        MySwal.fire("Alert", "บันทึกข้อมูลเรียบร้อย", "success");
            setTagName("")
            setTagUnivers(false)
            setTagWallpaper("")
    }
  };
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
          {mode == "create" ? <h1>Add New Tag</h1> : <h1>Edit Tag</h1>}
          <div className="modal-addanime-container">
            <FormControl
              fullWidth
              sx={{
                mb: 3,
              }}
              variant="standard"
            >
              <h3>Tag name</h3>
              <TextField
                hiddenLabel
                required
                id="outlined-adornment"
                placeholder="Tag name"
                value={tagName}
                name="tagName"
                onChange={onChangItem("tagName")}
              />
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                mb: 3,
              }}
              variant="standard"
            >
              <h3>Tag Universe</h3>
              <TextField
                hiddenLabel
                required
                id="outlined-adornment"
                value={tagUniverse}
                name="tagUniverse"
                onChange={onChangItem("tagUniverse")}
              />
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                mb: 3,
              }}
              variant="standard"
            >
              <h3>Tag Wallpaper (link)</h3>
              <TextField
                hiddenLabel
                required
                id="outlined-adornment"
                laceholder="Ex. https://images5.alphacoders.com/587/thumbbig-587597.webp"
                value={tagWallpaper}
                name="tagWallpaper"
                onChange={onChangItem("tagWallpaper")}
              />
            </FormControl>
          </div>
          <div className="modal-addanime-container-bottom">
            <button onClick={submitFormTag}>
              {mode == "create" ? "Add New" : " Edit Tag"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default AdminTagModal;