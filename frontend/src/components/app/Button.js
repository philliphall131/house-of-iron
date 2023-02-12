import { useEffect, useState } from "react"

const Button = ({children, onClick, variant, size}) => {
  const [bkColor, setBkColor] = useState('#8A9A3C');
  const [color, setColor] = useState('white')
  const [ftSize, setFtSize] = useState(18);
  const [paddingX, setPaddingX] = useState('1rem')
  const [paddingY, setPaddingY] = useState('.2rem')

  useEffect(()=>{
    switch(variant){
      case 'green':
        setBkColor('#8A9A3C')
        setColor('black')
        break;
      case 'grey':
        setBkColor('#595959')
        setColor('white')
        break;
      case 'orange':
        setBkColor('#d38a01')
        setColor('black')
        break;
    }
    switch(size){
      case 'sm':
        setFtSize('12px')
        setPaddingX('0.6rem')
        setPaddingY('0.1rem')
        break;
      case 'md':
        setFtSize('18px')
        setPaddingX('1rem')
        setPaddingY('0.2rem')
        break;
      case 'lg':
        setFtSize('24px')
        setPaddingX('1.6rem')
        setPaddingY('.3rem')
        break;
    }
  },[variant, size])

  return (
    <div>
      <button 
        className={`iron-button`}
        onClick={onClick}
        style={{ 
          fontSize: ftSize,
          color: color,
          backgroundColor: bkColor,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          paddingTop: paddingY,
          paddingBottom: paddingY,
        }}
      >
        {children}
      </button>
    </div>
  )
}

export default Button