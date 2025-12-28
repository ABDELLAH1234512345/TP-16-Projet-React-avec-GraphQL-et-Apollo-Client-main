import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_TRANSACTIONS } from "../services/graphql-queries";

/**
 * Composant React pour afficher l'historique des transactions bancaires
 *
 * Ce composant affiche la liste complète des transactions effectuées sur tous
 * les comptes bancaires. Il utilise Apollo Client pour récupérer les données
 * GraphQL et les présente dans une interface utilisateur moderne et intuitive.
 *
 * Fonctionnalités :
 * - Affichage paginé des transactions avec défilement
 * - Tri chronologique (plus récent en haut)
 * - Indicateurs visuels colorés selon le type (dépôt/vert, retrait/rouge)
 * - Bouton de rafraîchissement manuel des données
 * - Gestion des états de chargement et d'erreur
 * - Affichage détaillé : type, montant, date, compte associé, solde actuel
 * - Interface responsive avec Tailwind CSS
 * - Compteur total des transactions
 *
 * Les transactions sont affichées avec des bordures colorées et des icônes
 * pour une meilleure lisibilité. Le composant gère automatiquement les cas
 * où aucune transaction n'est disponible.
 *
 * @module components/TransactionList
 * @component
 * @author Halmaoui Abdellah
 * @version 2.0
 * @since 2025
 * @returns {JSX.Element} Composant React affichant la liste des transactions
 */
const TransactionList = () => {
    const { loading, error, data, refetch } = useQuery(GET_ALL_TRANSACTIONS);

    if (loading) return (
        <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-slate-600">Chargement des transactions...</span>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
                <div className="text-red-500 mr-3">⚠️</div>
                <div>
                    <p className="font-semibold text-red-800">Erreur de chargement</p>
                    <p className="text-red-600 text-sm">{error.message}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">Total: {data.allTransactions.length} transaction(s)</span>
                </div>
                <button
                    onClick={() => refetch()}
                    className="text-slate-600 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition"
                    title="Actualiser"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>

            {data.allTransactions.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-4xl mb-4">📊</div>
                    <p className="text-slate-500">Aucune transaction disponible</p>
                    <p className="text-slate-400 text-sm mt-2">Effectuez une transaction pour commencer</p>
                </div>
            ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {data.allTransactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className={`transaction-${transaction.type.toLowerCase()} rounded-xl p-4 border transition-all hover:shadow-card`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        transaction.type === 'DEPOT'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-red-100 text-red-600'
                                    }`}>
                                        {transaction.type === 'DEPOT' ? '📥' : '📤'}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800">
                                            {transaction.type === 'DEPOT' ? 'Dépôt' : 'Retrait'}
                                        </p>
                                        <p className="text-sm text-slate-600">
                                            {transaction.compte.type} • {new Date(transaction.date).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-xl font-bold ${
                                        transaction.type === 'DEPOT' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {transaction.type === 'DEPOT' ? '+' : '-'}{transaction.montant.toFixed(2)} €
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        Solde: {transaction.compte.solde.toFixed(2)} €
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionList;
