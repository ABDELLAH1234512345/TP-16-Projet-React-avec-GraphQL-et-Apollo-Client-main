import { ApolloProvider } from "@apollo/client";
import { client } from "./clients/apollo-client";
import CompteList from "./components/CompteList";
import CreateCompte from "./components/CreateCompte";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./App.css";

/**
 * Composant principal de l'application React de gestion bancaire
 *
 * Cette application frontend utilise React avec Apollo Client pour communiquer
 * avec un backend GraphQL. Elle fournit une interface utilisateur moderne
 * et professionnelle pour la gestion des comptes bancaires et des transactions.
 *
 * Fonctionnalités principales :
 * - Affichage de la liste des comptes avec statistiques
 * - Création de nouveaux comptes (courant/épargne)
 * - Gestion des transactions (dépôts/retraits)
 * - Interface responsive avec Tailwind CSS
 * - Mise à jour en temps réel via Apollo Client
 *
 * L'application se connecte au backend GraphQL via le proxy configuré
 * dans package.json (http://localhost:8082/graphql).
 *
 * @module App
 * @component
 * @author Halmaoui Abdellah
 * @version 2.0
 * @since 2025
 */
function App() {
    return (
        <ApolloProvider client={client}>
            <div className="min-h-screen bg-slate-50">
                {/* Navigation Header */}
                <nav className="bg-white shadow-lg border-b border-slate-200">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">🏦</span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-800">Banque Digital</h1>
                                    <p className="text-sm text-slate-600">Gestion des Comptes</p>
                                </div>
                            </div>
                            <div className="hidden md:flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-slate-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm">Connecté</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    {/* Welcome Section */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">
                            Bienvenue dans votre Espace Bancaire
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Gérez vos comptes et transactions en toute simplicité avec notre interface moderne
                        </p>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Left Column - Account Management */}
                        <div className="xl:col-span-1 space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 text-sm">💳</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-800">Gestion des Comptes</h3>
                                </div>
                                <CreateCompte />
                            </div>
                        </div>

                        {/* Middle Column - Account List */}
                        <div className="xl:col-span-1 space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-green-600 text-sm">📊</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-800">Vos Comptes</h3>
                                </div>
                                <CompteList />
                            </div>
                        </div>

                        {/* Right Column - Transactions */}
                        <div className="xl:col-span-1 space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <span className="text-purple-600 text-sm">💸</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-800">Transactions</h3>
                                </div>
                                <TransactionForm />
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <span className="text-orange-600 text-sm">📋</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-800">Historique</h3>
                                </div>
                                <TransactionList />
                            </div>
                        </div>
                    </div>

                    {/* Stats Footer */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-2">💰</div>
                            <div className="text-sm text-slate-600">Comptes Gérés</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
                            <div className="text-2xl font-bold text-green-600 mb-2">📈</div>
                            <div className="text-sm text-slate-600">Transactions Réussies</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-2">🔒</div>
                            <div className="text-sm text-slate-600">Sécurité Garantie</div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-slate-800 text-white mt-12">
                    <div className="container mx-auto px-4 py-6">
                        <div className="text-center">
                            <p className="text-slate-400">TP 16 - Application React GraphQL Apollo Client</p>
                            <p className="text-slate-500 text-sm mt-1">Développé par Halmaoui Abdellah • {new Date().getFullYear()}</p>
                        </div>
                    </div>
                </footer>
            </div>
        </ApolloProvider>
    );
}

export default App;
