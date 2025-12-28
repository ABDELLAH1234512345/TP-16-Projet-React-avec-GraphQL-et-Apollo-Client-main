import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/**
 * Point d'entrée principal de l'application React
 *
 * Ce fichier initialise l'application React en créant la racine du DOM
 * et en rendant le composant App principal. Il utilise React 18 avec
 * la nouvelle API createRoot pour une meilleure performance.
 *
 * Le mode StrictMode est activé pour détecter les problèmes potentiels
 * dans l'application pendant le développement.
 *
 * @module index
 * @author Halmaoui Abdellah
 * @version 2.0
 * @since 2025
 */

/**
 * Création de la racine React pour le conteneur DOM
 * @constant {Root}
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Rendu de l'application dans le conteneur DOM
 * Le mode StrictMode active des vérifications supplémentaires en développement
 */
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
