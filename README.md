# Task Management App

Manage and organize tasks with time tracking.
Created using Django-GraphQL-NextJS 

# Development
Required software:
- Python 3.10
- Django 4.1
- MySQL 8.0
- NodeJS 18

## Backend (Django + MySQL)
Starting from project root, go to backend/ folder.
Create virtual environment for installing required packages

`python -m venv venv`

Activate virtual environment

`venv/Scripts/activate` 

Install required packages

`pip install requirements.txt`

Navigate to taskmanagement/config

Create new file `db.config` matching `db.config.default` ensure username and password matches MySQL credential

Navigate to taskmanagement/

Migrate to MySQL database

`python ./manage.py migrate`

Then start the server

`python ./manage.py runserver`

Default port: 8000

## Frontend (NextJS)
From the project root, navigate to frontend/

Install node js packages

`npm i`

Run development server

`npm run serve`

Default port: 3000