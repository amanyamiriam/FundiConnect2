import React from 'react';
import './DownloadApp.css';

function DownloadApp() {
  return (
    <div className="download-app-section">
      <h2>Download Our App</h2>
      <p>Get the full FundiConnect experience on your mobile device.</p>
      <div className="app-stores">
        <a href="#google-play" className="app-store-button">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
        </a>
        <a href="#app-store" className="app-store-button">
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
        </a>
      </div>
    </div>
  );
}

export default DownloadApp;
