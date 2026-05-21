# Football Clubs Dashboard

An interactive web dashboard visualizing key financial and performance metrics for the world's top 10 football clubs from 2020 to 2024.

## 📊 Charts Included

- **Club Revenue** — Annual revenue in EUR millions
- **Transfer Spending** — Transfer window expenditure in EUR millions
- **Average Player Salary** — Mean annual player salary in EUR thousands
- **Trophies Won** — Distribution of trophies across clubs (pie chart)

## ⚽ Clubs Covered

Real Madrid, Barcelona, Manchester City, PSG, Bayern Munich, Liverpool, Manchester United, Chelsea, Arsenal, Juventus

## 🗂️ Project Structure

```
football_clubs/
├── app.py                    # Flask application
├── generate_data.py          # Script to generate the Excel dataset
├── football_clubs_data.xlsx
├── templates/
│   └── index.html
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## 🚀 Getting Started

### 1. Install dependencies

```bash
pip install flask pandas openpyxl
```

### 2. Generate the dataset (optional — file is already included)

```bash
python generate_data.py
```

### 3. Run the app

```bash
python app.py
```

### 4. Open in browser

```
http://127.0.0.1:5000
```

## 🔍 Features

- Filter all charts by season (2020–2024) or view the 5-year average
- Animated interactive charts powered by amCharts 5
- Responsive 2-column grid layout
- Football pitch-inspired green and gold theme

## 🛠️ Tech Stack

- **Backend:** Python, Flask, Pandas
- **Frontend:** HTML, CSS, JavaScript
- **Charts:** amCharts 5
- **Data:** Excel (.xlsx) via openpyxl