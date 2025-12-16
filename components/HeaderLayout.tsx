import React, { ReactNode } from 'react'
import Header from './Header'

const HeaderLayout = ({children} : {children : ReactNode}) => {
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}

export default HeaderLayout