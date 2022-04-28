import styles from './_category_card.module.scss'

export default ({ text, icon }) => {
  return (
    <div className={`${styles['category-card']} h-100`}>
      <div className='text-center'>
        <i className='material-icons text-primary' style={{fontSize: '60px'}}>bubble_chart</i>
      </div>
      <div className='text-center'>
        { text }
      </div>
    </div>
  )
}