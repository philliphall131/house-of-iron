import minus from '../../assets/minus.png';
import plus from '../../assets/plus.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const IconButton = ({type, onClick, bkColor }) => {
  const Icon = () => {
    if (type=='minus'){
      return <FontAwesomeIcon 
                className='set-icon' 
                style={{
                  backgroundColor: ''
                }}
                icon={solid('circle-minus')}
             />
    } else {
      return <FontAwesomeIcon 
                className='set-icon' 
                style={{
                  backgroundColor: ''
                }}
                icon={solid('circle-plus')}
              />
    }
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className='icon-button-wrapper'
      style={{
        border: 'none',
        width: '35px',
        height: '35px'
      }}
    >
      <Icon />
    </button>
  )
}

export default IconButton