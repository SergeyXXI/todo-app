import React from 'react';
import ReactDOM from 'react-dom/client';
import "views/styles/general.scss";
import App from 'views/app/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);