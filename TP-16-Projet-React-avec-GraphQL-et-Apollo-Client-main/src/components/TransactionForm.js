import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TRANSACTION } from '../services/graphql-mutations';
import { GET_ALL_TRANSACTIONS, GET_ALL_COMPTES } from '../services/graphql-queries';

/**
 * Composant React pour effectuer des transactions bancaires
 *
 * Ce composant fournit un formulaire interactif pour effectuer des dépôts
 * et retraits sur les comptes bancaires existants. Il utilise Apollo Client
 * pour exécuter les mutations GraphQL et met à jour automatiquement
 * les listes de transactions et comptes.
 *
 * Fonctionnalités :
 * - Formulaire avec validation des champs (montant positif requis)
 * - Sélection du type de transaction (dépôt/retrait)
 * - Sélecteur dynamique des comptes disponibles
 * - Gestion des états de chargement et d'erreur
 * - Mise à jour automatique des listes via refetchQueries
 * - Interface utilisateur colorée selon le type de transaction
 * - Messages de feedback utilisateur (succès/erreur)
 *
 * Le composant réinitialise le montant après transaction réussie
 * et affiche des alertes pour informer l'utilisateur du résultat.
 * Les comptes sont affichés avec leur type et solde actuel.
 *
 * @module components/TransactionForm
 * @component
 * @author Halmaoui Abdellah
 * @version 2.0
 * @since 2025
 * @returns {JSX.Element} Composant React avec formulaire de transaction
 */
const TransactionForm = () => {
    const [type, setType] = useState('DEPOT');
    const [montant, setMontant] = useState('');
    const [compteId, setCompteId] = useState('');

    // Récupérer la liste des comptes pour le sélecteur
    const { data: comptesData } = useQuery(GET_ALL_COMPTES);

    const [addTransaction, { loading, error }] = useMutation(ADD_TRANSACTION, {
        refetchQueries: [
            { query: GET_ALL_TRANSACTIONS },
            { query: GET_ALL_COMPTES }
        ],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!montant || parseFloat(montant) <= 0) {
            alert('Veuillez entrer un montant valide');
            return;
        }

        if (!compteId) {
            alert('Veuillez sélectionner un compte');
            return;
        }

        try {
            await addTransaction({
                variables: {
                    transactionRequest: {
                        type,
                        montant: parseFloat(montant),
                        compteId,
                    },
                },
            });

            setMontant('');
            alert(`✅ ${type === 'DEPOT' ? 'Dépôt' : 'Retrait'} effectué avec succès !`);
        } catch (err) {
            alert('❌ Erreur : ' + err.message);
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Type de transaction *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <label className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                            type === 'DEPOT'
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-slate-200 hover:border-slate-300'
                        }`}>
                            <input
                                type="radio"
                                value="DEPOT"
                                checked={type === 'DEPOT'}
                                onChange={(e) => setType(e.target.value)}
                                className="sr-only"
                            />
                            <div className="text-center">
                                <div className="text-2xl mb-2">📥</div>
                                <div className="font-semibold">Dépôt</div>
                                <div className="text-xs opacity-75">Ajouter de l'argent</div>
                            </div>
                        </label>

                        <label className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                            type === 'RETRAIT'
                                ? 'border-red-500 bg-red-50 text-red-700'
                                : 'border-slate-200 hover:border-slate-300'
                        }`}>
                            <input
                                type="radio"
                                value="RETRAIT"
                                checked={type === 'RETRAIT'}
                                onChange={(e) => setType(e.target.value)}
                                className="sr-only"
                            />
                            <div className="text-center">
                                <div className="text-2xl mb-2">📤</div>
                                <div className="font-semibold">Retrait</div>
                                <div className="text-xs opacity-75">Retirer de l'argent</div>
                            </div>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Compte *
                    </label>
                    <div className="relative">
                        <select
                            value={compteId}
                            onChange={(e) => setCompteId(e.target.value)}
                            className="form-input w-full pr-4 py-3 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500 appearance-none"
                            required
                        >
                            <option value="">-- Sélectionner un compte --</option>
                            {comptesData?.allComptes.map((compte) => (
                                <option key={compte.id} value={compte.id}>
                                    {compte.type} - Solde: {compte.solde.toFixed(2)}€
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Montant *
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-slate-500 text-sm">€</span>
                        </div>
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={montant}
                            onChange={(e) => setMontant(e.target.value)}
                            className="form-input w-full pl-8 pr-4 py-3 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Ex: 50.00"
                            required
                        />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{error.message}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                        loading
                            ? 'bg-slate-400 cursor-not-allowed text-white'
                            : type === 'DEPOT'
                                ? 'btn-primary bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                                : 'btn-primary bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                    }`}
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Traitement...</span>
                        </>
                    ) : (
                        <>
                            <span>{type === 'DEPOT' ? '💰' : '💸'}</span>
                            <span>{type === 'DEPOT' ? 'Effectuer le dépôt' : 'Effectuer le retrait'}</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
