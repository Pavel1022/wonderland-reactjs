import React from 'react';
import '../../css/notFound.css';

function NotFound() {
    return (
        <React.Fragment>
            <div id="colorlib-main">
                <section className="ftco-section">
                    <div className="container">
                        <div id="notfound">
                            <div className="notfound">
                                <div className="notfound-404">
                                    <h1>Oops!</h1>
                                </div>
                                <h2 style={{marginTop: '5%'}}>404 - Page not found</h2>
                                <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                                <a href="/">Go To Homepage</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </React.Fragment>
    );
}

export default NotFound;