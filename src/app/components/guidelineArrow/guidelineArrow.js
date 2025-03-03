import styles from "./guidelineArrow.module.css";

const GuidelineArrow = () => {
    return(
        <div className="d-flex align-items-center justify-content-center">
            <i className={`${styles.guidelineArrowHorizontal} bi bi-arrow-right h1`}></i>
            <i className={`${styles.guidelineArrowVertical} bi bi-arrow-down h2`}></i>
        </div>
    )

}

export default GuidelineArrow;