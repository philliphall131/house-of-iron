import { useEffect, useState } from "react"

const Button = ({children, onClick, variant, size, type='button'}) => {
  const [bkColor, setBkColor] = useState('#8A9A3C');
  const [color, setColor] = useState('black')
  const [ftSize, setFtSize] = useState(18);
  const [paddingX, setPaddingX] = useState('1rem')
  const [paddingY, setPaddingY] = useState('.2rem')
  const [width, setWidth] = useState('75px')

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
    switch(size){
      case 'sm':
        setFtSize('12px')
        setPaddingX('0.6rem')
        setPaddingY('0.1rem')
        // setWidth('50px')
        break;
      case 'md':
        setFtSize('18px')
        setPaddingX('1rem')
        setPaddingY('0.2rem')
        // setWidth('75px')
        break;
      case 'lg':
        setFtSize('24px')
        setPaddingX('1.6rem')
        setPaddingY('.3rem')
        // setWidth('100px')
        break;
    }
  },[variant, size])

  return (
    <button 
      className={`iron-button`}
      onClick={onClick}
      type={type}
      style={{ 
        fontSize: ftSize,
        color: color,
        backgroundColor: bkColor,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        // width: width,
      }}
    >
      {children}
    </button>
  )
}

export default Button