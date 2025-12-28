/**
 * Constantes JavaScript pour les types énumérés bancaires
 *
 * Ce fichier définit les constantes JavaScript pour les types énumérés utilisés
 * dans l'application bancaire. Ces constantes assurent la cohérence des valeurs
 * utilisées dans les composants React et les requêtes GraphQL.
 *
 * Les constantes sont organisées par domaine :
 * - TypeCompte : Types de comptes bancaires disponibles
 * - TypeTransaction : Types de transactions bancaires disponibles
 *
 * Ces constantes sont utilisées pour éviter les erreurs de frappe et assurer
 * la maintenance du code. Elles correspondent aux types TypeScript définis
 * dans interfaces.js.
 *
 * @module services/type-definitions
 * @author Halmaoui Abdellah
 * @version 2.0
 * @since 2025
 */

/**
 * Constantes pour les types de comptes bancaires disponibles
 * @constant {Object}
 * @property {string} COURANT - Compte courant pour les opérations quotidiennes
 * @property {string} EPARGNE - Compte épargne pour l'épargne à long terme
 */
export const TypeCompte = {
    COURANT: 'COURANT', // Compte courant pour les opérations quotidiennes
    EPARGNE: 'EPARGNE', // Compte épargne pour l'épargne à long terme
};

/**
 * Constantes pour les types de transactions bancaires disponibles
 * @constant {Object}
 * @property {string} DEPOT - Transaction de dépôt (crédit sur le compte)
 * @property {string} RETRAIT - Transaction de retrait (débit du compte)
 */
export const TypeTransaction = {
    DEPOT: 'DEPOT',     // Transaction de dépôt (crédit sur le compte)
    RETRAIT: 'RETRAIT', // Transaction de retrait (débit du compte)
};

