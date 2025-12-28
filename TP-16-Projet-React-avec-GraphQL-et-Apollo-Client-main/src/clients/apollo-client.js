import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

/**
 * Configuration du client Apollo pour la communication GraphQL
 *
 * Ce fichier configure le client Apollo Client qui gère toutes les communications
 * avec le serveur GraphQL backend. Il établit la connexion HTTP et configure
 * le cache en mémoire pour optimiser les performances.
 *
 * Configuration :
 * - URI GraphQL : '/graphql' (utilise le proxy vers localhost:8082)
 * - Cache : InMemoryCache pour le stockage local des données
 * - Politique de récupération : 'network-only' pour toujours obtenir les données fraîches
 *
 * Le proxy est configuré dans package.json pour rediriger les requêtes
 * vers le serveur backend Spring Boot.
 *
 * @module clients/apollo-client
 * @author Halmaoui Abdellah
 * @version 2.0
 * @since 2025
 */

/**
 * Configuration du lien HTTP pour Apollo Client
 * @constant {HttpLink}
 */
const httpLink = createHttpLink({
    uri: '/graphql',
    credentials: 'include',
});

/**
 * Instance du client Apollo configuré pour l'application
 * 
 * @constant {ApolloClient}
 * @property {HttpLink} link - Lien HTTP vers le serveur GraphQL
 * @property {InMemoryCache} cache - Cache en mémoire pour optimiser les performances
 * @property {Object} defaultOptions - Options par défaut pour les requêtes
 */
export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
        query: {
            fetchPolicy: 'network-only',
        },
    },
});

