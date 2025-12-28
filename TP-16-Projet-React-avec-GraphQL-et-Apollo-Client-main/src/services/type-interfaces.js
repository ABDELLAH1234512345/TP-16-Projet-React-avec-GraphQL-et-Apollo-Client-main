/**
 * Interfaces TypeScript pour les entités bancaires GraphQL
 *
 * Ce fichier définit toutes les interfaces TypeScript utilisées dans l'application
 * bancaire React avec Apollo Client. Ces interfaces assurent la sécurité des types
 * et l'autocomplétion lors du développement.
 *
 * Les interfaces sont organisées par domaine :
 * - Entités principales (Compte, Transaction)
 * - Statistiques (SoldeStats, TransactionStats)
 * - Requêtes/DTOs (CompteRequest, TransactionRequest)
 * - Types énumérés (TypeCompte, TypeTransaction)
 *
 * Toutes les interfaces sont exportées pour être utilisées dans les composants
 * React et les requêtes GraphQL.
 *
 * @module services/type-interfaces
 * @author Halmaoui Abdellah
 * @version 2.0
 * @since 2025
 */

/**
 * Interface pour un compte bancaire
 * @interface Compte
 * @property {string} id - Identifiant unique du compte
 * @property {number} solde - Solde actuel du compte en euros
 * @property {string} dateCreation - Date de création au format ISO 8601
 * @property {TypeCompte} type - Type de compte (COURANT ou EPARGNE)
 */
export interface Compte {
    id: string;           // Identifiant unique du compte
    solde: number;        // Solde actuel du compte
    dateCreation: string; // Date de création au format ISO
    type: TypeCompte;     // Type de compte (COURANT ou EPARGNE)
}

/**
 * Interface pour une transaction bancaire
 * @interface Transaction
 * @property {string} id - Identifiant unique de la transaction
 * @property {TypeTransaction} type - Type de transaction (DEPOT ou RETRAIT)
 * @property {number} montant - Montant de la transaction en euros
 * @property {string} date - Date de la transaction au format ISO 8601
 * @property {Compte} compte - Compte associé à la transaction
 */
export interface Transaction {
    id: string;           // Identifiant unique de la transaction
    type: TypeTransaction; // Type de transaction (DEPOT ou RETRAIT)
    montant: number;      // Montant de la transaction
    date: string;         // Date de la transaction au format ISO
    compte: Compte;       // Compte associé à la transaction
}

/**
 * Interface pour les statistiques de solde des comptes
 * @interface SoldeStats
 * @property {number} count - Nombre total de comptes
 * @property {number} sum - Somme totale des soldes en euros
 * @property {number} average - Moyenne des soldes en euros
 */
export interface SoldeStats {
    count: number;   // Nombre total de comptes
    sum: number;     // Somme totale des soldes
    average: number; // Moyenne des soldes
}

/**
 * Interface pour les statistiques des transactions
 * @interface TransactionStats
 * @property {number} count - Nombre total de transactions
 * @property {number} sumDepots - Somme totale des dépôts en euros
 * @property {number} sumRetraits - Somme totale des retraits en euros
 */
export interface TransactionStats {
    count: number;       // Nombre total de transactions
    sumDepots: number;   // Somme totale des dépôts
    sumRetraits: number; // Somme totale des retraits
}

/**
 * Interface pour les demandes de création de compte
 * @interface CompteRequest
 * @property {number} solde - Solde initial du nouveau compte en euros
 * @property {TypeCompte} type - Type du nouveau compte (COURANT ou EPARGNE)
 */
export interface CompteRequest {
    solde: number;    // Solde initial du nouveau compte
    type: TypeCompte; // Type du nouveau compte
}

/**
 * Interface pour les demandes de création de transaction
 * @interface TransactionRequest
 * @property {TypeTransaction} type - Type de la transaction (DEPOT ou RETRAIT)
 * @property {number} montant - Montant de la transaction en euros
 * @property {string} compteId - Identifiant unique du compte concerné
 */
export interface TransactionRequest {
    type: TypeTransaction; // Type de la transaction
    montant: number;       // Montant de la transaction
    compteId: string;      // ID du compte concerné
}

/**
 * Types énumérés pour les valeurs prédéfinies
 * @typedef {('COURANT'|'EPARGNE')} TypeCompte - Types de comptes disponibles
 * @typedef {('DEPOT'|'RETRAIT')} TypeTransaction - Types de transactions disponibles
 */
export type TypeCompte = 'COURANT' | 'EPARGNE';         // Types de comptes disponibles
export type TypeTransaction = 'DEPOT' | 'RETRAIT';      // Types de transactions disponibles

