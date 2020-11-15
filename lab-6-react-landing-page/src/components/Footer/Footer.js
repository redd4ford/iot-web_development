import React from 'react';
import "../Footer/Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

function Footer() {
    return(
        <div className="footer-container">
            <div className="footer-logo">
                <a href="#"><FontAwesomeIcon icon={faDoorOpen} />DOORIFY.</a>
            </div>
            <div className="footer-social">
                <ul>
                    <li><a href="#"><FontAwesomeIcon icon={faInstagramSquare} /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faTwitterSquare} /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faTelegram} /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faFacebookSquare} /></a></li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;