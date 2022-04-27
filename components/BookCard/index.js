export default ({ data }) => {
  const { cover_url, title, authors } = data

  return (
    <div className="card">
      <img src={cover_url} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{ title }</h5>
        <p className="card-text">
          { authors.join(', ') }
        </p>
      </div>
    </div>
  )
}