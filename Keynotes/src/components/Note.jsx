import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {

  async function deleteNote(){
    console.log({id:props.id})
    await fetch("https://keynotes-api.onrender.com/notes"+props.id,{
      method: "delete",
    })
    .catch((err) => {
      console.log(err.message);
    })
     //location.reload();
  }


  function handleClick() {
    deleteNote();
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
