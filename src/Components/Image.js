// Imports
import styles from "../Styles/Image.module.css"

// Creating component for the image here.
function Image(props){

    // Returning JSX
    return (
        <div className={styles.imageContainer}>
            <img src={props.url} alt={props.title} className={styles.image}/>
            <div className={styles.iconContainer}>
                <img src="https://cdn-icons-png.flaticon.com/128/9790/9790368.png" 
                    alt="Delete" className={styles.deleteIcon} 
                    onClick={() => props.handleDeleteIcon(props.id)} 
                    />
                <img src="https://cdn-icons-png.flaticon.com/128/5996/5996831.png" 
                    alt="Edit" 
                    className={styles.editIcon} 
                    onClick={() => props.handleEditIcon(props.id, {title: props.title, imageUrl: props.url})}
                    />
            </div>
            <p className={styles.imageTitle}>{props.title}</p>
        </div>
    )
}

// Exporting component.
export default Image;