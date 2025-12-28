import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CompteList from './CompteList';
import { GET_ALL_COMPTES } from '../services/graphql-queries';

/**
 * Tests pour le composant CompteList
 *
 * Ces tests vérifient le comportement du composant CompteList dans différents scénarios :
 * - Affichage du chargement
 * - Gestion des erreurs
 * - Affichage des données
 * - Fonctionnalité de rafraîchissement
 *
 * Les tests utilisent MockedProvider d'Apollo Client pour simuler les réponses GraphQL.
 *
 * @module components/CompteList.test
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

// Mock pour la requête réussie
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
];

// Mock pour l'état de chargement
const loadingMocks = [
    {
        request: {
            query: GET_ALL_COMPTES,
        },
        result: {
            data: {
                allComptes: mockComptes,
            },
        },
        delay: 100, // Délai pour simuler le chargement
    },
];

// Mock pour les erreurs
const errorMocks = [
    {
        request: {
            query: GET_ALL_COMPTES,
        },
        error: new Error('Erreur GraphQL'),
    },
];

describe('CompteList Component', () => {
    /**
     * Test l'affichage du composant pendant le chargement
     */
    test('affiche l\'indicateur de chargement', async () => {
        render(
            <MockedProvider mocks={loadingMocks} addTypename={false}>
                <CompteList />
            </MockedProvider>
        );

        expect(screen.getByText('Chargement des comptes...')).toBeInTheDocument();
        expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner
    });

    /**
     * Test l'affichage des erreurs
     */
    test('affiche le message d\'erreur en cas d\'échec', async () => {
        render(
            <MockedProvider mocks={errorMocks} addTypename={false}>
                <CompteList />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Erreur de chargement')).toBeInTheDocument();
            expect(screen.getByText('Erreur GraphQL')).toBeInTheDocument();
        });
    });

    /**
     * Test l'affichage des comptes avec données valides
     */
    test('affiche la liste des comptes correctement', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CompteList />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Total: 2 compte(s)')).toBeInTheDocument();
        });

        // Vérifier l'affichage des comptes
        expect(screen.getByText('1 500,50 €')).toBeInTheDocument();
        expect(screen.getByText('5 000,00 €')).toBeInTheDocument();
        expect(screen.getByText('COURANT')).toBeInTheDocument();
        expect(screen.getByText('ÉPARGNE')).toBeInTheDocument();
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
                data: { allComptes: mockComptes },
                refetch: mockRefetch,
            }),
        }));

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CompteList />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Total: 2 compte(s)')).toBeInTheDocument();
        });

        const refreshButton = screen.getByRole('button', { name: /rafraîchir/i });
        fireEvent.click(refreshButton);

        expect(mockRefetch).toHaveBeenCalledTimes(1);
    });

    /**
     * Test l'affichage des statistiques des comptes
     */
    test('calcule et affiche les statistiques correctement', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CompteList />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Total: 2 compte(s)')).toBeInTheDocument();
            expect(screen.getByText('6 500,50 €')).toBeInTheDocument(); // Solde total
        });
    });
});