import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import TransactionForm from './TransactionForm';
import { ADD_TRANSACTION } from '../services/graphql-mutations';
import { GET_ALL_TRANSACTIONS, GET_ALL_COMPTES } from '../services/graphql-queries';

/**
 * Tests pour le composant TransactionForm
 *
 * Ces tests vérifient le comportement du formulaire de transaction :
 * - Chargement des comptes
 * - Validation des champs
 * - Soumission réussie des transactions
 * - Gestion des erreurs
 *
 * @module components/TransactionForm.test
 * @author Halmaoui Abdellah
 * @version 2.0
 * @since 2025
 */

// Données de test pour les comptes
const mockComptes = [
    {
        id: '1',
        solde: 1500.50,
        dateCreation: '2025-01-15',
        type: 'COURANT'
    },
    {
        id: '2',
        solde: 5000.00,
        dateCreation: '2025-02-20',
        type: 'EPARGNE'
    }
];

// Mock pour les requêtes
const mocks = [
    {
        request: {
            query: GET_ALL_COMPTES,
        },
        result: {
            data: {
                allComptes: mockComptes,
            },
        },
    },
    {
        request: {
            query: ADD_TRANSACTION,
            variables: {
                transaction: {
                    compteId: '1',
                    montant: 500.0,
                    type: 'DEPOT',
                },
            },
        },
        result: {
            data: {
                addTransaction: {
                    id: '1',
                    compteId: '1',
                    montant: 500.0,
                    date: '2025-12-09',
                    type: 'DEPOT',
                },
            },
        },
    },
    {
        request: {
            query: GET_ALL_TRANSACTIONS,
        },
        result: {
            data: {
                allTransactions: [],
            },
        },
    },
];

// Mock pour les erreurs
const errorMocks = [
    {
        request: {
            query: GET_ALL_COMPTES,
        },
        result: {
            data: {
                allComptes: mockComptes,
            },
        },
    },
    {
        request: {
            query: ADD_TRANSACTION,
            variables: {
                transaction: {
                    compteId: '1',
                    montant: 500.0,
                    type: 'DEPOT',
                },
            },
        },
        error: new Error('Erreur lors de la transaction'),
    },
];

describe('TransactionForm Component', () => {
    /**
     * Test le rendu initial du formulaire
     */
    test('affiche le formulaire de transaction correctement', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TransactionForm />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByLabelText(/type de transaction/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/montant/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/compte/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /effectuer transaction/i })).toBeInTheDocument();
        });
    });

    /**
     * Test le chargement des comptes dans le sélecteur
     */
    test('charge et affiche les comptes dans le sélecteur', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TransactionForm />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('COURANT - 1 500,50 €')).toBeInTheDocument();
            expect(screen.getByText('ÉPARGNE - 5 000,00 €')).toBeInTheDocument();
        });
    });

    /**
     * Test la validation du montant (montant négatif)
     */
    test('valide le montant positif', async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TransactionForm />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByLabelText(/compte/i)).toBeInTheDocument();
        });

        const montantInput = screen.getByLabelText(/montant/i);
        const compteSelect = screen.getByLabelText(/compte/i);
        const submitButton = screen.getByRole('button', { name: /effectuer transaction/i });

        fireEvent.change(compteSelect, { target: { value: '1' } });
        fireEvent.change(montantInput, { target: { value: '-100' } });
        fireEvent.click(submitButton);

        expect(alertMock).toHaveBeenCalledWith('Veuillez entrer un montant valide');

        alertMock.mockRestore();
    });

    /**
     * Test la validation du montant (montant vide)
     */
    test('valide le montant non vide', async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TransactionForm />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByLabelText(/compte/i)).toBeInTheDocument();
        });

        const compteSelect = screen.getByLabelText(/compte/i);
        const submitButton = screen.getByRole('button', { name: /effectuer transaction/i });

        fireEvent.change(compteSelect, { target: { value: '1' } });
        fireEvent.click(submitButton);

        expect(alertMock).toHaveBeenCalledWith('Veuillez entrer un montant valide');

        alertMock.mockRestore();
    });

    /**
     * Test la validation de la sélection du compte
     */
    test('valide la sélection du compte', async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TransactionForm />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByLabelText(/compte/i)).toBeInTheDocument();
        });

        const montantInput = screen.getByLabelText(/montant/i);
        const submitButton = screen.getByRole('button', { name: /effectuer transaction/i });

        fireEvent.change(montantInput, { target: { value: '500' } });
        fireEvent.click(submitButton);

        expect(alertMock).toHaveBeenCalledWith('Veuillez sélectionner un compte');

        alertMock.mockRestore();
    });

    /**
     * Test la soumission réussie d'une transaction
     */
    test('effectue une transaction avec succès', async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TransactionForm />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByLabelText(/compte/i)).toBeInTheDocument();
        });

        const typeSelect = screen.getByLabelText(/type de transaction/i);
        const montantInput = screen.getByLabelText(/montant/i);
        const compteSelect = screen.getByLabelText(/compte/i);
        const submitButton = screen.getByRole('button', { name: /effectuer transaction/i });

        fireEvent.change(typeSelect, { target: { value: 'DEPOT' } });
        fireEvent.change(montantInput, { target: { value: '500' } });
        fireEvent.change(compteSelect, { target: { value: '1' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Transaction effectuée avec succès !');
        });

        // Vérifier que le montant est réinitialisé
        expect(montantInput.value).toBe('');

        alertMock.mockRestore();
    });

    /**
     * Test l'affichage des erreurs
     */
    test('affiche les erreurs de transaction', async () => {
        render(
            <MockedProvider mocks={errorMocks} addTypename={false}>
                <TransactionForm />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByLabelText(/compte/i)).toBeInTheDocument();
        });

        const montantInput = screen.getByLabelText(/montant/i);
        const compteSelect = screen.getByLabelText(/compte/i);
        const submitButton = screen.getByRole('button', { name: /effectuer transaction/i });

        fireEvent.change(montantInput, { target: { value: '500' } });
        fireEvent.change(compteSelect, { target: { value: '1' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Erreur lors de la transaction')).toBeInTheDocument();
        });
    });

    /**
     * Test l'état de chargement
     */
    test('affiche l\'indicateur de chargement pendant la transaction', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TransactionForm />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByLabelText(/compte/i)).toBeInTheDocument();
        });

        const montantInput = screen.getByLabelText(/montant/i);
        const compteSelect = screen.getByLabelText(/compte/i);
        const submitButton = screen.getByRole('button', { name: /effectuer transaction/i });

        fireEvent.change(montantInput, { target: { value: '500' } });
        fireEvent.change(compteSelect, { target: { value: '1' } });
        fireEvent.click(submitButton);

        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent('Transaction...');
    });

    /**
     * Test la sélection du type de transaction
     */
    test('permet la sélection du type de transaction', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TransactionForm />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByLabelText(/type de transaction/i)).toBeInTheDocument();
        });

        const typeSelect = screen.getByLabelText(/type de transaction/i);

        fireEvent.change(typeSelect, { target: { value: 'RETRAIT' } });

        expect(typeSelect.value).toBe('RETRAIT');
    });
});