// Imports
import { useEffect, useRef, useState } from "react";
import styles from "../Styles/Image-form.module.css"
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import db from "../firebaseConfig";
import { toast } from "react-toastify";

// Component for image form to add a new image in a album.
function ImageForm(props){

    // States
    let [title, setTitle] = useState("");
    let [imageUrl, setImageUrl] = useState("");
    const imageTitleRef = useRef(null);
    const imageUrlRef = useRef(null);

    // Function to add imageTitleRef value to title.
    const handleTitleInputChange = () => {
        setTitle(imageTitleRef.current.value);
    }

    // Function to add imageUrlRef value to imageUrl.
    const handleUrlInputChange = () => {
        setImageUrl(imageUrlRef.current.value);
    }

    // Function to handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Checking if image title already exists
        const snapShot = await getDocs(collection(db, "images"));
        const existingImage = snapShot.docs.find((doc) => doc.data().title === title);
        if(existingImage)
        {
            toast.error("Image already exists by this title!");
        }
        else
        {
            try {
                // Adding new image
                const imagesRef = doc(collection(db, "images"));
                await setDoc(imagesRef, {
                    albumId: props.albumId,
                    albumName: props.albumName,
                    title: title,
                    imageUrl: imageUrl,
                    createdOn: new Date()
                });
                setTitle(""); // Resetting the form field after submission
                setImageUrl("");
                // Showing notification
                toast.success("Image added successfully!");
            } catch (error) {
                console.log(error);
                toast.error("Failed to add the image. Please try again later.");
            }
        }
    };

    const handleClearBtn = () => {
        setTitle(""); 
        setImageUrl("");
    }


    // Returning JSX
    return (
        <div className={styles.imageFormContainer}>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.imageForm}>
            <h1> Add Image to {props.albumName}</h1>
            <input type="text" placeholder="Title" ref={imageTitleRef} onChange={handleTitleInputChange} value={title} required/>
            <input type="url" placeholder="Image Url" ref={imageUrlRef} onChange={handleUrlInputChange} value={imageUrl} required/>
            <div className={styles.btnContainer}>
            <button type="reset" className={styles.clearBtn} onClick={handleClearBtn}>Clear</button>
            <button type="submit" className={styles.addBtn}>Add</button>
            </div>
            </form>
        </div>
    )
}

// Exporting component.
export default ImageForm;