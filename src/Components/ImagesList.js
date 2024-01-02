// Imports
import { useEffect, useRef, useState } from "react";
import styles from "../Styles/Images-list.module.css"
import ImageForm from "./ImageForm";
import Image from "./Image";
import { collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import db from "../firebaseConfig";
import Spinner from "react-spinner-material";
import { toast } from "react-toastify";

// Creating component for the ImagesList here.
function ImagesList(props){

    // States
    const [imagesFormVisible, setImagesFormVisible] = useState(false);
    let [images, setImages] = useState([]);
    let [loading, setLoading] = useState(true);
    let [search, setSearch] = useState(false);
    let [searchQuery, setSearchQuery] = useState("");
    let [updateImage, setUpdateImage] = useState(false);
    let [updateImageData, setUpdateImageData] = useState({});
    const searchInputRef = useRef(null);

    // Using side effect to render all images on album load and render searched images.
    useEffect(() => {
        const fetchData = async () => {
            const unsubscribe = onSnapshot(collection(db, "images"), async (snapShot) => {
                const images = snapShot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
    
                if (!searchQuery) {
                    const albumImages = images.filter((image) => image.albumId === props.albumId);
                    setImages(albumImages);
                    setLoading(false);
                } else {
                    try {
                        const querySnapshot = await getDocs(collection(db, 'images'));
                        const searchQueryLower = searchQuery.toLowerCase();
                        
                        const filteredImages = querySnapshot.docs
                            .filter((doc) => {
                                const title = doc.data().title.toLowerCase();
                                const albumId = doc.data().albumId;
                                return title.includes(searchQueryLower) && albumId === props.albumId;
                            })
                            .map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            }));
                            
                        setImages(filteredImages);
                        setLoading(false);
                    } catch (error) {
                        console.error("Error fetching documents: ", error);
                    }
                }
            });
    
            return () => unsubscribe();
        };
    
        fetchData();
    }, [props.albumId, searchQuery]);

    // onClick Add Image
    const handleAddImageBtn = () => {
        setImagesFormVisible(true);
    }

    // onClick cancel after add Image button
    const handleCancelAddImageBtn = () => {
        setImagesFormVisible(false);
        setUpdateImage(false);
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
    const handleSearchQuery = (event) => {
        const query = event.target.value;
        setSearchQuery(query); // Update searchQuery with input value
    }

    // Editing Image
    const handleEditIcon = (id, data) => {
        const updatedData = {...data, id};
        setUpdateImage(true);
        setImagesFormVisible(true);
        setUpdateImageData(updatedData);
    }

    // Deleting image
    const handleDeleteIcon = async (id) => {
        const docRef = doc(db, "images", id);
        try {
            await deleteDoc(docRef);
            toast.success("Image removed successfully");
        } catch (error) {
            console.error("Error deleting image: ", error);
            // Optionally, show an error notification if the deletion fails
            toast.error("Failed to remove image");
        }
    };
    

    // Returning JSX
    return (
    <div className={styles.imagesListContainer}>
        <header>
            {/* Shwoing back to album button */}
        <div className={styles.backImageContainer}>
            <img src="https://mellow-seahorse-fc9268.netlify.app/assets/back.png" alt="back" onClick={props.handleBackToAlbumBtn} className={styles.backIcon}/> 
        </div>

        {/* Showing album name*/}
        <h1>{images.length > 0 ? 
                    `Images in ${props.albumName}` : images.length === 0 && search ? 
                    "No images found on your search" : `No images found in the album.`
                    }
        </h1>

        {/* Showing search icon */}
        {images.length || search > 0 ?
        (
            search ? (
            <div className={styles.searchContainer}>
            <input type="search" className={styles.searchInput} 
                placeholder="Search"
                ref={searchInputRef} 
                onChange={(event) => handleSearchQuery(event)}
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
        {imagesFormVisible ? 
            <ImageForm albumId={props.albumId} 
            albumName={props.albumName} 
            updateImg={updateImage} 
            updateImgData={updateImageData} 
            /> : null}
        {/*  */}

        {/* Conditionally showing loading while data is fetching */}
        {loading ? (
        <div className={styles.loaderContainer}>
            <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
        </div>
        ) : (

        // Showing all images in main of the album
           <main className={styles.imagesMain}>
            {images.map((image) => (
                <>
                {/* Passing to image component each image for render */}
                <Image key={image.id} id={image.id} title={image.title} url={image.imageUrl} handleDeleteIcon={handleDeleteIcon} handleEditIcon={handleEditIcon}/>
                </>
            ))}
        </main>
    )}
    </div>
    )
}

// Exporting component.
export default ImagesList;