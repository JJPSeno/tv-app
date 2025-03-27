# TV App project

## Prerequisites
- Python 3.8+
- pip
- Node.js 18.19.1+
- pnpm
- Angular CLI
- Git

## Local Development Setup
1. Clone the Repository
```
git clone https://github.com/JJPSeno/tv-app.git
```
2. Navigate into the `tv-app` folder
```
cd tv-app
```
3. Backend Setup (Django)

    3.1. Create a Virtual Environment
    ```
    cd server
    python -m venv venv
    venv\Scripts\activate #For windows. Run the similar activation command for your OS.
    ```
    3.2. Install Python Dependencies
    ```
    pip install -r requirements.txt
    ```
    3.3. Database Migrations
    ```
    python manage.py migrate
    ```
    3.4. Run Development Server
    ```
    python manage.py runserver
    ```
The backend will be available at `http://localhost:8000`

4. Frontend Setup (Angular)

    4.1 Navigate to Frontend Directory
    ```
    cd tv-app-frontend #in a separate terminal
    ```
    4.2 Install Dependencies
    ```
    pnpm install
    ```
    4.3 Run Development Server
    ```
    ng serve
    ```
The frontend will be available at http://localhost:4200
