// Imports
import { useEffect, useState } from "react";
import styles from "../Styles/Album-list.module.css"
import AlbumForm from "./AlbumForm";
import db from "../firebaseConfig";
import { collection, doc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import Album from "./Album";
import Spinner from 'react-spinner-material';
import ImagesList from "./ImagesList";

// Component for album list to show form and all albums.
function AlbumList(){
    // States
    const[imagesVisible, setImagesVisible] = useState(false);
    const [albumImages, setAlbumImages] = useState([]);
    const [albumName, setAlbumName] = useState("");
    const [albumId, setAlbumId] = useState("");
    const[albumFormVisible, setAlbumFormVisible] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    // Using effect on mounting to vet all albums from database.
    useEffect(() => {

        async function fetchData(){
            const unsub = onSnapshot(collection(db, "albums"), (snapShot) => {
                    const albums = snapShot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setAlbums(albums);
                    // setting loading false after successfully fetched data
                    if(albums)
                    {
                        setLoading(false);
                    }
            });
        }
        fetchData();
    }, []);

    // onClick Add Album
    const handleAddAlbumBtn = () => {
        setAlbumFormVisible(true);
    }

    // onClick cancel after add album button
    const handleCancelAddAlbumBtn = () => {
        setAlbumFormVisible(false);
    }

    // Handle click on album to open images in album
    const handleOpenImages = async (id, name) => {
        setImagesVisible(true);
        // Finding images of the album.
        try {
            const snapShot = await getDocs(collection(db, "images"));
            const images = snapShot.find((doc) => doc.data().albumId === id);

            // Setting album images
            setAlbumImages(images);
            setAlbumName(name);
            setAlbumId(id);
        } catch (error) {
            console.log(error);
        }
    }

    // Handle back to album button.
    const handleBackToAlbumBtn = () => {
        setImagesVisible(false);
    }

    // Returning JSX
    return (
        imagesVisible ? <ImagesList images={albumImages} albumId={albumId} albumName={albumName} handleBackToAlbumBtn={handleBackToAlbumBtn}/> :
            <div className={styles.albumsContainer}>
            {albumFormVisible ? <AlbumForm/> : null}
            <header>
                <h1>Your albums</h1>
                {albumFormVisible ? 
                <button className={styles.cancelBtn} onClick={handleCancelAddAlbumBtn}>Cancel</button> :  
                <button className={styles.addAlbumBtn} onClick={handleAddAlbumBtn}>Add album</button>
                }
            </header>

            {/* Showing loading */}
            {loading ?       
                <div>
                    <Spinner radius={120} color={"#333"} stroke={2} visible={true}/>
                </div> :
            <main>
                {/* Here passing data to albums */}
                {albums.length > 0 ? albums.map((album) => (
                    <Album key={album.id} name={album.name} albumId={album.id} handleOpenImages={handleOpenImages}/>
                )) : <h1>No Albums Let's Create One</h1>}
            </main>
            }
        </div>
    )
}

// Exporting component.
export default AlbumList;