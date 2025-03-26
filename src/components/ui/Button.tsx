import React from 'react'
import { ButtonProps } from '../../types/buttonProps'


const Button:React.FC<ButtonProps> = ({onClick, type,  label, className, icon, title}) => {
  return (
    <button onClick={onClick} type={type} title={title} className={className}>
        {label}{icon}
    </button>
  )
}

export default React.memo(Button)
