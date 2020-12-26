import React from 'react'
import Translate from './Translate'

const Footer = (...props) => (
    <footer className="fixed-bottom footerTik mx-auto container">
        <p className="float-right"><a className="footerLink" href="#"><Translate string={"Volver_arriba"}/></a></p>
        <p>&copy; TikTak, Inc. &middot; <a className="footerLink" href="https://github.com/"><Translate string={"Privacidad"}/></a> &middot; <a className="footerLink" href="https://github.com/"><Translate string={"Terminos"}/></a></p>
    </footer>
)

export default Footer