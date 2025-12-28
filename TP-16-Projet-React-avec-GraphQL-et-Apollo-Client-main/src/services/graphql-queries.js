import { gql } from '@apollo/client';

/**
 * Requêtes GraphQL pour l'application de gestion bancaire
 *
 * Ce fichier contient toutes les requêtes GraphQL utilisées par l'application
 * React pour interagir avec le backend Spring Boot GraphQL. Les requêtes
 * sont organisées par fonctionnalité et utilisent des variables pour
 * la réutilisabilité.
 *
 * Les requêtes incluent :
 * - Gestion des comptes (CRUD et statistiques)
 * - Gestion des transactions (consultation et statistiques)
 * - Recherche par critères (ID, type)
 *
 * Toutes les requêtes sont exportées en tant que constantes pour être
 * utilisées dans les composants React avec Apollo Client.
 *
 * @module services/graphql-queries
 * @author Halmaoui Abdellah
 * @version 2.0
 * @since 2025
 */

/**
 * Requête GraphQL pour récupérer tous les comptes bancaires
 * @constant {DocumentNode}
 */
export const GET_ALL_COMPTES = gql`
  query GetAllComptes {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

/**
 * Requête GraphQL pour récupérer un compte par son identifiant
 * @param {string} id - Identifiant unique du compte
 * @constant {DocumentNode}
 */
export const GET_COMPTE_BY_ID = gql`
  query GetCompteById($id: ID!) {
    compteById(id: $id) {
      id
      solde
      dateCreation
      type
    }
  }
`;

/**
 * Requête GraphQL pour calculer les statistiques de solde total
 * Retourne le nombre de comptes, la somme totale et la moyenne
 * @constant {DocumentNode}
 */
export const GET_TOTAL_SOLDE = gql`
  query GetTotalSolde {
    totalSolde {
      count
      sum
      average
    }
  }
`;

/**
 * Requête GraphQL pour récupérer les comptes filtrés par type
 * @param {string} type - Type de compte (COURANT ou EPARGNE)
 * @constant {DocumentNode}
 */
export const GET_COMPTE_BY_TYPE = gql`
  query GetCompteByType($type: TypeCompte!) {
    findCompteByType(type: $type) {
      id
      solde
      dateCreation
      type
    }
  }
`;

/**
 * Requête GraphQL pour récupérer toutes les transactions d'un compte spécifique
 * @param {string} id - Identifiant unique du compte
 * @constant {DocumentNode}
 */
export const GET_COMPTE_TRANSACTIONS = gql`
  query GetCompteTransactions($id: ID!) {
    compteTransactions(id: $id) {
      id
      type
      montant
      date
      compte {
        id
        solde
        type
      }
    }
  }
`;

/**
 * Requête GraphQL pour récupérer toutes les transactions de tous les comptes
 * @constant {DocumentNode}
 */
export const GET_ALL_TRANSACTIONS = gql`
  query GetAllTransactions {
    allTransactions {
      id
      type
      montant
      date
      compte {
        id
        solde
        type
      }
    }
  }
`;

/**
 * Requête GraphQL pour obtenir les statistiques globales des transactions
 * Retourne le nombre total, la somme des dépôts et la somme des retraits
 * @constant {DocumentNode}
 */
export const GET_TRANSACTION_STATS = gql`
  query GetTransactionStats {
    transactionStats {
      count
      sumDepots
      sumRetraits
    }
  }
`;

