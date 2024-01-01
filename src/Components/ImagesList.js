// Imports
import { useState } from "react";
import styles from "../Styles/Images-list.module.css"
import ImageForm from "./ImageForm";

// Creating component for the ImagesList here.
function ImagesList(props){
    // States
    const [imagesFormVisible, setImagesFormVisible] = useState(false);

    // onClick Add Image
    const handleAddImageBtn = () => {
        setImagesFormVisible(true);
    }

    // onClick cancel after add Image button
    const handleCancelAddImageBtn = () => {
        setImagesFormVisible(false);
    }

    // Returning JSX
    return (
    <div className={styles.imagesListContainer}>
        <header>
        <div className={styles.backImageContainer}>
            <img src="https://mellow-seahorse-fc9268.netlify.app/assets/back.png" alt="back" onClick={props.handleBackToAlbumBtn} className={styles.backIcon}/> 
        </div>
        <h1>{props.images.length > 0 ? `Images in ${props.albumName}` : `No images found in the album.`}</h1>
        {props.images.length > 0 ? <img src="https://cdn-icons-png.flaticon.com/128/954/954591.png" alt="search"/> : null}
        {imagesFormVisible ? 
        <button className={styles.cancelBtn} onClick={handleCancelAddImageBtn}>Cancel</button> :  
        <button className={styles.addImageBtn} onClick={handleAddImageBtn}>Add Image</button>
        }
        </header>

        {/* Displaying form conditionally */}
        {imagesFormVisible ? <ImageForm albumId={props.albumId} albumName={props.albumName}/> : null}
        {/*  */}

    </div>
    )
}

// Exporting component.
export default ImagesList;