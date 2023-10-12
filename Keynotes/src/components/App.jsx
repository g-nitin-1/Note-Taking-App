import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("https://keynotes-api.onrender.com/notes")
    .then((res) => res.json())
    .then((data) =>{
      console.log(data);
      data.forEach(note => {
        setNotes(prevNotes => {
          return [...prevNotes,{title: note.title,content:note.content,id:note.number}];
        })
      });
    })
    .catch(err => {
      console.log(err.message);
    })
  },[])

  function addNote(newNote) {

    setNotes(prevNotes => {
      return [...prevNotes, {title: newNote.title,content:newNote.content,id:newNote.number}];
    });
    
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return (noteItem.id?(noteItem.id!==id):(index!==id));
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id||index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
