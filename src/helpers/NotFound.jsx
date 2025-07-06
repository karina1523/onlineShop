import React from 'react';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="notfound-page">
            <div className="notfound-container">
                <div className="tooltip-wrapper">
                    <button className="notfound-button">
                        <span className="notfound-icon">
                            <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" width="16" height="16">
                                <path
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Hover for Info
                        </span>
                    </button>

                    <div className="tooltip">
                        <div className="tooltip-header">
                            <div className="tooltip-icon">
                                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                    <path
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    />
                                </svg>
                            </div>
                            <h3>Page Not Found</h3>
                        </div>
                        <p>
                            This page doesn’t exist or may have been moved. Please check the URL or return to the homepage.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

