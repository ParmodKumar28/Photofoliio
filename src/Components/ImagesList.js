// Imports
import { useEffect, useRef, useState } from "react";
import styles from "../Styles/Images-list.module.css"
import ImageForm from "./ImageForm";
import Image from "./Image";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebaseConfig";
import Spinner from "react-spinner-material";

// Creating component for the ImagesList here.
function ImagesList(props){
    // Using effect on mounting to get all images of the album from database.
    useEffect(() => {
        const fetchData = async () => {
            const unsubscribe = onSnapshot(collection(db, "images"), (snapShot) => {
                const images = snapShot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
    
                const albumImages = images.filter((image) => image.albumId === props.albumId);
                setImages(albumImages);
                setLoading(false);
            });
    
            return () => unsubscribe(); // Unsubscribe the listener when component unmounts
        };
    
        fetchData();
    }, [props.albumId]);        

    // States
    const [imagesFormVisible, setImagesFormVisible] = useState(false);
    let [images, setImages] = useState([]);
    let [loading, setLoading] = useState(true);
    let [search, setSearch] = useState(false);
    let [searchQuery, setSerachQuery] = useState("");
    const searchInputRef = useRef(null);

    // onClick Add Image
    const handleAddImageBtn = () => {
        setImagesFormVisible(true);
    }

    // onClick cancel after add Image button
    const handleCancelAddImageBtn = () => {
        setImagesFormVisible(false);
    }

    // Handling search button
    const handleSearchBtnClick = () => {
        setSearch(true);
        setTimeout(() => {
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }, 100); 
    }

    // Handling close search
    const handleCloseSearchBtn = () => {
        setSearch(false);
    }

    // Function to set searchQuery o change of search input value.
    const handleSearchQuery = () => {
        setSerachQuery(searchInputRef.current.value);
        // Reseting the serach input value
        searchInputRef.current.value = "";
    }

    // Returning JSX
    return (
    <div className={styles.imagesListContainer}>
        <header>
            {/* Shwoing back to album button */}
        <div className={styles.backImageContainer}>
            <img src="https://mellow-seahorse-fc9268.netlify.app/assets/back.png" alt="back" onClick={props.handleBackToAlbumBtn} className={styles.backIcon}/> 
        </div>

        {/* Showing album name*/}
        <h1>{images.length > 0 ? `Images in ${props.albumName}` : `No images found in the album.`}</h1>

        {/* Showing search icon */}
        {images.length > 0 ?
        (
            search ? (
            <div className={styles.searchContainer}>
            <input type="search" className={styles.searchInput} 
                placeholder="Search"
                ref={searchInputRef} 
                onChange={handleSearchQuery}
                value={searchQuery}
                />
            <img src="https://cdn-icons-png.flaticon.com/128/13692/13692659.png"
             alt="close search" 
             onClick={handleCloseSearchBtn}
             className={styles.closeSearch}
             />
            </div>)
             :
            <img src="https://cdn-icons-png.flaticon.com/128/954/954591.png" 
                alt="search" 
                className={styles.searchIcon} 
                onClick={handleSearchBtnClick}
                />
        )
         : null}

         {/* Showing add image and cancel button */}
        {imagesFormVisible ? 
        <button className={styles.cancelBtn} onClick={handleCancelAddImageBtn}>Cancel</button> :  
        <button className={styles.addImageBtn} onClick={handleAddImageBtn}>Add Image</button>
        }
        </header>

        {/* Displaying form conditionally */}
        {imagesFormVisible ? <ImageForm albumId={props.albumId} albumName={props.albumName}/> : null}
        {/*  */}

        {/* Conditionally showing loading while data is fetching */}
        {loading ? (
        <div>
            <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
        </div>
        ) : (

        // Showing all images in main of the album
           <main className={styles.imagesMain}>
            {images.map((image) => (
                <>
                {/* Passing to image component each image for render */}
                <Image key={image.id} title={image.title} url={image.imageUrl} />
                </>
            ))}
        </main>
    )}
    </div>
    )
}

// Exporting component.
export default ImagesList;