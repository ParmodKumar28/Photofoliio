// Imports
import { useRef, useState } from "react";
import styles from "../Styles/Album-form.module.css"
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import db from "../firebaseConfig";
import { toast } from "react-toastify";

// Component for album form to create a new album.
function AlbumForm(){

    // States
    let [name, setName] = useState("");
    const albumNameRef = useRef(null);

    // Function to add ref value to name.
    const handleInputChange = () => {
        setName(albumNameRef.current.value);
        console.log(name);
    }

    // Function to handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Checking if album name already exists
        const snapShot = await getDocs(collection(db, "albums"));
        const existingAlbum = snapShot.docs.find((doc) => doc.data().name === name);
        if(existingAlbum)
        {
            toast.error("Album already exists by this name!");
        }
        else
        {
            try {
                // Adding new album
                const albumsRef = doc(collection(db, "albums"));
                const docAdded = await setDoc(albumsRef, {
                    name: name,
                    createdOn: new Date()
                });
                setName(""); // Resetting the form field after submission
                // Showing notification
                toast.success("Album created successfully!");
            } catch (error) {
                console.log(error);
                toast.error("Failed to create the album. Please try again later.");
            }
        }
    };

    const handleClearBtn = () => {
        setName("");
    }


    // Returning JSX
    return (
        <div className={styles.albumFormContainer}>
            <h1>Create an album</h1>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.albumForm}>
            <input type="text" placeholder="Album Name" ref={albumNameRef} onChange={handleInputChange} value={name} required/>
            <button type="reset" className={styles.clearBtn} onClick={handleClearBtn}>Clear</button>
            <button type="submit" className={styles.createBtn}>Create</button>
            </form>
        </div>
    )
}

// Exporting component.
export default AlbumForm;