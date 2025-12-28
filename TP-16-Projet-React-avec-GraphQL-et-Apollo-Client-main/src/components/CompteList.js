import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPTES } from "../services/graphql-queries";

/**
 * Composant React pour afficher la liste des comptes bancaires
 *
 * Ce composant utilise Apollo Client pour récupérer et afficher tous les comptes
 * bancaires depuis le backend GraphQL. Il fournit une interface utilisateur
 * moderne avec :
 * - Affichage en grille responsive des informations des comptes
 * - Indicateurs visuels pour les types de compte (courant/épargne)
 * - Bouton de rafraîchissement pour recharger les données
 * - Gestion des états de chargement et d'erreur
 * - Statistiques du nombre total de comptes
 *
 * Le composant utilise Tailwind CSS pour le styling et gère automatiquement
 * la mise à jour des données via Apollo Client.
 *
 * @module components/CompteList
 * @component
 * @author Halmaoui Abdellah
 * @version 2.0
 * @since 2025
 * @returns {JSX.Element} Composant React affichant la liste des comptes
 */
const CompteList = () => {
    const { loading, error, data, refetch } = useQuery(GET_ALL_COMPTES);

    if (loading) return (
        <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-slate-600">Chargement des comptes...</span>
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
                    <span className="text-sm text-slate-600">Total: {data.allComptes.length} compte(s)</span>
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

            {data.allComptes.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-4xl mb-4">🏦</div>
                    <p className="text-slate-500">Aucun compte disponible</p>
                    <p className="text-slate-400 text-sm mt-2">Créez votre premier compte pour commencer</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {data.allComptes.map((compte) => (
                        <div
                            key={compte.id}
                            className="account-card rounded-xl p-6 hover:shadow-card transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                        compte.type === 'COURANT'
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'bg-green-100 text-green-600'
                                    }`}>
                                        {compte.type === 'COURANT' ? '💳' : '💰'}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800">
                                            {compte.type === 'COURANT' ? 'Compte Courant' : 'Compte Épargne'}
                                        </p>
                                        <p className="text-xs text-slate-500 font-mono">
                                            ID: {compte.id.substring(0, 8)}...
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-slate-800">
                                        {compte.solde.toFixed(2)} €
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Créé le {new Date(compte.dateCreation).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    compte.type === 'COURANT'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-green-100 text-green-800'
                                }`}>
                                    {compte.type}
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    compte.solde >= 0
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {compte.solde >= 0 ? '✓ Solde positif' : '⚠️ Solde négatif'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompteList;
