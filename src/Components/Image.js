// Imports
import styles from "../Styles/Image.module.css"

// Creating component for the image here.
function Image(props){
    // Returning JSX
    return (
        <div className={styles.imageContainer} onClick={() => props.handleOpenImages(props.imageId, props.name)}>
            <div className={styles.imgContainer}>
            <img key={props.key} src="https://cdn-icons-png.flaticon.com/128/3342/3342137.png" alt="image" className={styles.imageImg}/>
            </div>
            <p>{props.name}</p>
        </div>
    )
}

// Exporting component.
export default Image;