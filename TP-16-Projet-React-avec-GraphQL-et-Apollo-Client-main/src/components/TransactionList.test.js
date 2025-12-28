import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import TransactionList from './TransactionList';
import { GET_ALL_TRANSACTIONS } from '../services/graphql-queries';

/**
 * Tests pour le composant TransactionList
 *
 * Ces tests vérifient l'affichage de la liste des transactions :
 * - États de chargement et d'erreur
 * - Affichage des transactions
 * - Fonctionnalité de rafraîchissement
 * - Tri chronologique
 *
 * @module components/TransactionList.test
 * @author Halmaoui Abdellah
 * @version 2.0
 * @since 2025
 */

// Données de test pour les transactions
const mockTransactions = [
    {
        id: '1',
        compteId: '1',
        montant: 500.0,
        date: '2025-12-09',
        type: 'DEPOT'
    },
    {
        id: '2',
        compteId: '2',
        montant: 200.0,
        date: '2025-12-08',
        type: 'RETRAIT'
    }
];

// Mock pour la requête réussie
const mocks = [
    {
        request: {
            query: GET_ALL_TRANSACTIONS,
        },
        result: {
            data: {
                allTransactions: mockTransactions,
            },
        },
    },
];

// Mock pour l'état de chargement
const loadingMocks = [
    {
        request: {
            query: GET_ALL_TRANSACTIONS,
        },
        result: {
            data: {
                allTransactions: mockTransactions,
            },
        },
        delay: 100, // Délai pour simuler le chargement
    },
];

// Mock pour les erreurs
const errorMocks = [
    {
        request: {
            query: GET_ALL_TRANSACTIONS,
        },
        error: new Error('Erreur GraphQL'),
    },
];

// Mock pour aucune transaction
const emptyMocks = [
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

describe('TransactionList Component', () => {
    /**
     * Test l'affichage du composant pendant le chargement
     */
    test('affiche l\'indicateur de chargement', async () => {
        render(
            <MockedProvider mocks={loadingMocks} addTypename={false}>
                <TransactionList />
            </MockedProvider>
        );

        expect(screen.getByText('Chargement des transactions...')).toBeInTheDocument();
        expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner
    });

    /**
     * Test l'affichage des erreurs
     */
    test('affiche le message d\'erreur en cas d\'échec', async () => {
        render(
            <MockedProvider mocks={errorMocks} addTypename={false}>
                <TransactionList />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Erreur de chargement')).toBeInTheDocument();
            expect(screen.getByText('Erreur GraphQL')).toBeInTheDocument();
        });
    });

    /**
     * Test l'affichage des transactions
     */
    test('affiche la liste des transactions correctement', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TransactionList />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Total: 2 transaction(s)')).toBeInTheDocument();
        });

        // Vérifier l'affichage des transactions
        expect(screen.getByText('500,00 €')).toBeInTheDocument();
        expect(screen.getByText('200,00 €')).toBeInTheDocument();
        expect(screen.getByText('DÉPÔT')).toBeInTheDocument();
        expect(screen.getByText('RETRAIT')).toBeInTheDocument();
    });

    /**
     * Test l'affichage quand il n'y a pas de transactions
     */
    test('affiche un message quand aucune transaction n\'est disponible', async () => {
        render(
            <MockedProvider mocks={emptyMocks} addTypename={false}>
                <TransactionList />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Aucune transaction trouvée')).toBeInTheDocument();
        });
    });

    /**
     * Test la fonctionnalité de rafraîchissement
     */
    test('rafraîchit les données lors du clic sur le bouton', async () => {
        const mockRefetch = jest.fn();

        // Mock de useQuery avec refetch
        jest.mock('@apollo/client', () => ({
            ...jest.requireActual('@apollo/client'),
            useQuery: () => ({
                loading: false,
                error: null,
                data: { allTransactions: mockTransactions },
                refetch: mockRefetch,
            }),
        }));

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TransactionList />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Total: 2 transaction(s)')).toBeInTheDocument();
        });

        const refreshButton = screen.getByRole('button', { name: /rafraîchir/i });
        fireEvent.click(refreshButton);

        expect(mockRefetch).toHaveBeenCalledTimes(1);
    });

    /**
     * Test l'affichage des détails des transactions
     */
    test('affiche les détails complets des transactions', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TransactionList />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Total: 2 transaction(s)')).toBeInTheDocument();
        });

        // Vérifier les détails affichés
        expect(screen.getByText('Compte #1')).toBeInTheDocument();
        expect(screen.getByText('Compte #2')).toBeInTheDocument();
        expect(screen.getByText('09/12/2025')).toBeInTheDocument();
        expect(screen.getByText('08/12/2025')).toBeInTheDocument();
    });

    /**
     * Test les indicateurs visuels pour les types de transaction
     */
    test('affiche les indicateurs visuels corrects pour les types', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TransactionList />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Total: 2 transaction(s)')).toBeInTheDocument();
        });

        // Vérifier les classes CSS pour les indicateurs visuels
        const depotTransaction = screen.getByText('DÉPÔT').closest('.border-green-200');
        const retraitTransaction = screen.getByText('RETRAIT').closest('.border-red-200');

        expect(depotTransaction).toBeInTheDocument();
        expect(retraitTransaction).toBeInTheDocument();
    });
});