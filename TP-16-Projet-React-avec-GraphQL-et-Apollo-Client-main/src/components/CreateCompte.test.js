import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CreateCompte from './CreateCompte';
import { SAVE_COMPTE } from '../services/graphql-mutations';
import { GET_ALL_COMPTES } from '../services/graphql-queries';

/**
 * Tests pour le composant CreateCompte
 *
 * Ces tests vérifient le comportement du formulaire de création de compte :
 * - Validation des champs
 * - Soumission réussie
 * - Gestion des erreurs
 * - Réinitialisation du formulaire
 *
 * @module components/CreateCompte.test
 * @author Halmaoui Abdellah
 * @version 2.0
 * @since 2025
 */

// Mock pour la mutation réussie
const successMocks = [
    {
        request: {
            query: SAVE_COMPTE,
            variables: {
                compte: {
                    solde: 1000.0,
                    type: 'COURANT',
                },
            },
        },
        result: {
            data: {
                saveCompte: {
                    id: '3',
                    solde: 1000.0,
                    dateCreation: '2025-12-09',
                    type: 'COURANT',
                },
            },
        },
    },
    {
        request: {
            query: GET_ALL_COMPTES,
        },
        result: {
            data: {
                allComptes: [],
            },
        },
    },
];

// Mock pour les erreurs
const errorMocks = [
    {
        request: {
            query: SAVE_COMPTE,
            variables: {
                compte: {
                    solde: 1000.0,
                    type: 'COURANT',
                },
            },
        },
        error: new Error('Erreur lors de la création'),
    },
];

describe('CreateCompte Component', () => {
    /**
     * Test le rendu initial du formulaire
     */
    test('affiche le formulaire de création correctement', () => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <CreateCompte />
            </MockedProvider>
        );

        expect(screen.getByLabelText(/solde/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/type de compte/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /créer compte/i })).toBeInTheDocument();
    });

    /**
     * Test la validation des champs (solde négatif)
     */
    test('valide le solde positif', async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <CreateCompte />
            </MockedProvider>
        );

        const soldeInput = screen.getByLabelText(/solde/i);
        const submitButton = screen.getByRole('button', { name: /créer compte/i });

        fireEvent.change(soldeInput, { target: { value: '-100' } });
        fireEvent.click(submitButton);

        expect(alertMock).toHaveBeenCalledWith('Veuillez entrer un solde valide');

        alertMock.mockRestore();
    });

    /**
     * Test la validation des champs (solde vide)
     */
    test('valide le solde non vide', async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <CreateCompte />
            </MockedProvider>
        );

        const submitButton = screen.getByRole('button', { name: /créer compte/i });

        fireEvent.click(submitButton);

        expect(alertMock).toHaveBeenCalledWith('Veuillez entrer un solde valide');

        alertMock.mockRestore();
    });

    /**
     * Test la création réussie d'un compte
     */
    test('crée un compte avec succès', async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <MockedProvider mocks={successMocks} addTypename={false}>
                <CreateCompte />
            </MockedProvider>
        );

        const soldeInput = screen.getByLabelText(/solde/i);
        const typeSelect = screen.getByLabelText(/type de compte/i);
        const submitButton = screen.getByRole('button', { name: /créer compte/i });

        fireEvent.change(soldeInput, { target: { value: '1000' } });
        fireEvent.change(typeSelect, { target: { value: 'COURANT' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Compte créé avec succès !');
        });

        // Vérifier que le formulaire est réinitialisé
        expect(soldeInput.value).toBe('');

        alertMock.mockRestore();
    });

    /**
     * Test l'affichage des erreurs
     */
    test('affiche les erreurs de création', async () => {
        render(
            <MockedProvider mocks={errorMocks} addTypename={false}>
                <CreateCompte />
            </MockedProvider>
        );

        const soldeInput = screen.getByLabelText(/solde/i);
        const submitButton = screen.getByRole('button', { name: /créer compte/i });

        fireEvent.change(soldeInput, { target: { value: '1000' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Erreur lors de la création du compte')).toBeInTheDocument();
        });
    });

    /**
     * Test l'état de chargement
     */
    test('affiche l\'indicateur de chargement pendant la soumission', async () => {
        render(
            <MockedProvider mocks={successMocks} addTypename={false}>
                <CreateCompte />
            </MockedProvider>
        );

        const soldeInput = screen.getByLabelText(/solde/i);
        const submitButton = screen.getByRole('button', { name: /créer compte/i });

        fireEvent.change(soldeInput, { target: { value: '1000' } });
        fireEvent.click(submitButton);

        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent('Création...');
    });

    /**
     * Test la sélection du type de compte
     */
    test('permet la sélection du type de compte', () => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <CreateCompte />
            </MockedProvider>
        );

        const typeSelect = screen.getByLabelText(/type de compte/i);

        fireEvent.change(typeSelect, { target: { value: 'EPARGNE' } });

        expect(typeSelect.value).toBe('EPARGNE');
    });
});