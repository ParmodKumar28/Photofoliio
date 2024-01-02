// Imports
import styles from "../Styles/Image.module.css"

// Creating component for the image here.
function Image(props){
    // Returning JSX
    return (
        <div className={styles.imageContainer}>
            <img src={props.url} alt={props.title} className={styles.image}/>
            <p className={styles.imageTitle}>{props.title}</p>
        </div>
    )
}

// Exporting component.
export default Image;