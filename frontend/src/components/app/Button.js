import { useEffect, useState } from "react"

const Button = ({children, onClick, variant, type='button', className}) => {
  const [bkColor, setBkColor] = useState('#8A9A3C');
  const [color, setColor] = useState('black')

  useEffect(()=>{
    switch(variant){
      case 'green':
        setBkColor('#8A9A3C')
        setColor('black')
        break;
      case 'grey':
        setBkColor('#c2c2c2')
        setColor('black')
        break;
      case 'orange':
        setBkColor('#d38a01')
        setColor('black')
        break;
    }
  },[variant])

  return (
    <button 
      className={` ${className} iron-button`}
      onClick={onClick}
      type={type}
      style={{ 
        color: color,
        backgroundColor: bkColor
      }}
    >
      {children}
    </button>
  )
}

export default Button