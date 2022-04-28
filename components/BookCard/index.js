import styles from './_book_card.module.scss'

export default ({ data }) => {
  const { cover_url, title, authors } = data

  return (
    <div className={styles.card}>
      <i title="Add to bookmark" className={`${styles['bookmark-button']} material-icons bg-white text-primary border hoverable rounded shadow`}>
        bookmark_border
      </i>
      <img src={cover_url} className={`${styles['card-img']} card-img-top`} alt={title} />
      <div className="card-body p-0">
        <h5 className={styles["card-title"]}>
          {title}
        </h5>
        <p className={`${styles['card-subtitle']} text-secondary`}>{authors.join(", ")}</p>
      </div>
    </div>
  );
}