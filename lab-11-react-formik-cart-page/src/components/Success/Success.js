import { Link } from 'react-router-dom';

import success from '../../img/success.jpg';

import "./Success.css";

export default function Success() {
    return (
        <div class="success-text">
            <img src={success} alt="yay!"></img>
            <h1>Splendid!</h1>
            <div>We have just sent your order to processing. We will call you in 15 minutes!</div>
            <div className="go-back-button">
                <Link to='/catalog'>
                    <button>Go back to catalog</button>
                </Link>
            </div>
        </div>
    );
}