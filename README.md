# React Native App - Login and Sign Up Screens

This is a simple React Native app with a Login and Sign Up screen. It uses **Formik** for form handling, **AsyncStorage** for saving the email with the "Remember Me" option, and **Yup** for validation. It also includes a password strength indicator on the Sign Up screen.

## Features

- **Login Screen**:
  - Email and password login form.
  - "Remember Me" option to save the email.
  - Basic email validation.

- **Sign Up Screen**:
  - Email, password, and confirm password fields.
  - Password strength validation (Weak, Medium, Strong).
  - Password match validation for confirmation.

## Installation

1. Clone the repository:
    ```
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Install required packages:
    ```
    npm install @react-native-async-storage/async-storage formik react-native-check-box yup
    ```

4. Run the app:
    ```
    npm start
    ```

5. Download the Expo app and scan the QR code.

   **Note**: Both the laptop and mobile device should be connected to the same Wi-Fi network.

## Usage

### Login Screen
1. Enter your email and password to log in.
2. If the "Remember Me" checkbox is checked, the email will be saved and auto-filled when you return to the app.

### Sign Up Screen
1. Enter your email, password, and confirm password to create a new account.
2. The password strength will be displayed based on the password entered (Weak, Medium, or Strong).
3. The confirm password field ensures both passwords match.
