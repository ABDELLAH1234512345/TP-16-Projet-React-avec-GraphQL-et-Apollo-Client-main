import { gql } from '@apollo/client';

/**
 * Mutations GraphQL pour les opérations de modification
 *
 * Ce fichier contient toutes les mutations GraphQL utilisées pour modifier
 * les données dans le backend. Les mutations permettent de créer, modifier
 * et supprimer des comptes et transactions.
 *
 * Les mutations incluent :
 * - Création de comptes bancaires
 * - Suppression de comptes existants
 * - Ajout de transactions (dépôts/retraits)
 *
 * Chaque mutation retourne les données mises à jour pour permettre
 * la mise à jour automatique de l'interface utilisateur via Apollo Client.
 *
 * @module services/graphql-mutations
 * @author Halmaoui Abdellah
 * @version 2.0
 * @since 2025
 */

/**
 * Mutation GraphQL pour créer un nouveau compte bancaire
 * @param {Object} compte - Objet contenant le solde initial et le type de compte
 * @param {number} compte.solde - Solde initial du compte
 * @param {string} compte.type - Type de compte (COURANT ou EPARGNE)
 * @constant {DocumentNode}
 */
export const SAVE_COMPTE = gql`
  mutation SaveCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

/**
 * Mutation GraphQL pour supprimer un compte bancaire existant
 * @param {string} id - Identifiant unique du compte à supprimer
 * @constant {DocumentNode}
 */
export const DELETE_COMPTE = gql`
  mutation DeleteCompte($id: ID!) {
    deleteCompte(id: $id)
  }
`;

/**
 * Mutation GraphQL pour ajouter une nouvelle transaction bancaire
 * @param {Object} transactionRequest - Objet contenant les détails de la transaction
 * @param {string} transactionRequest.type - Type de transaction (DEPOT ou RETRAIT)
 * @param {number} transactionRequest.montant - Montant de la transaction
 * @param {string} transactionRequest.compteId - Identifiant du compte concerné
 * @constant {DocumentNode}
 */
export const ADD_TRANSACTION = gql`
  mutation AddTransaction($transactionRequest: TransactionRequest!) {
    addTransaction(transactionRequest: $transactionRequest) {
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

