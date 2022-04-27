import styles from './_chip.module.scss'

export default ({ text, icon }) => {
  return (
    <div className={ styles.chip }>
      <div className='d-flex align-items-center gap-1'>
        { icon && <i className='material-icons text-primary' style={{fontSize: '15px'}}>adb</i> }
        { text }
      </div>
    </div>
  )
}