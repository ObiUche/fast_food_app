# Food Ordering Mobile App

A React Native food ordering application with authentication, menu browsing, cart functionality, and user profiles. Built with Expo, Appwrite backend, and Zustand for state management.
Features

    User Authentication: Sign up, sign in, and session management

    Menu Browsing: View food items by category or search

    Shopping Cart: Add/remove items, adjust quantities

    Responsive UI: Tailwind CSS for styling with custom components

    State Management: Zustand stores for auth and cart state

    Backend Integration: Appwrite for database and authentication

Tech Stack

    Frontend: React Native, Expo Router

    Styling: Tailwind CSS with NativeWind

    State Management: Zustand

    Backend: Appwrite (Database, Authentication)

    Error Tracking: Sentry

    Type Safety: TypeScript

Components
Core Components

    CustomButton: Reusable button with loading states

    CustomInput: Form input with labels and validation

    CustomHeader: Navigation header with back button

    MenuCard: Displays menu items with add-to-cart functionality

    CartItem: Individual cart item with quantity controls

    SearchBar: Search functionality

    Filter: Category filtering

State Management

    auth.store: Handles user authentication state

    cart.store: Manages shopping cart state and calculations

Screens

    Authentication: SignIn, SignUp

    Main App:

        Home (Featured offers)

        Search (Browse menu with filters)

        Cart (Checkout functionality)

        Profile (User details)

Setup

    Install dependencies:

bash

npm install
# or
yarn install

    Configure environment variables:

bash

cp .env.example .env
# Fill in your Appwrite credentials

    Run the app:

bash

expo start

Project Structure
text

/src
├── components/       # Reusable components
├── constants/       # App constants and images
├── lib/             # Utility functions and Appwrite API
├── store/           # Zustand state stores
├── types/           # TypeScript type definitions
└── app/             # App screens and navigation

Backend Requirements

This app requires an Appwrite backend with:

    Database configured with collections for:

        Users

        Menu items

        Categories

    Storage bucket for images

    Authentication enabled

Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
License

MIT
