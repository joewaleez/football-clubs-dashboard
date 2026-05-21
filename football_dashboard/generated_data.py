import pandas as pd

base_data = {
    "Real Madrid":  {"Revenue_M": 831,  "Squad_Size": 25, "Avg_Salary_K": 8200, "Transfer_Spend_M": 180, "Trophies": 3, "Stadium_Cap": 81044},
    "Barcelona":    {"Revenue_M": 800,  "Squad_Size": 26, "Avg_Salary_K": 7500, "Transfer_Spend_M": 220, "Trophies": 2, "Stadium_Cap": 99354},
    "Man City":     {"Revenue_M": 781,  "Squad_Size": 24, "Avg_Salary_K": 7800, "Transfer_Spend_M": 250, "Trophies": 4, "Stadium_Cap": 55017},
    "PSG":          {"Revenue_M": 776,  "Squad_Size": 27, "Avg_Salary_K": 9100, "Transfer_Spend_M": 300, "Trophies": 3, "Stadium_Cap": 48583},
    "Bayern Munich":{"Revenue_M": 765,  "Squad_Size": 24, "Avg_Salary_K": 6900, "Transfer_Spend_M": 130, "Trophies": 5, "Stadium_Cap": 75024},
    "Liverpool":    {"Revenue_M": 703,  "Squad_Size": 25, "Avg_Salary_K": 6500, "Transfer_Spend_M": 160, "Trophies": 2, "Stadium_Cap": 61276},
    "Man United":   {"Revenue_M": 688,  "Squad_Size": 26, "Avg_Salary_K": 6200, "Transfer_Spend_M": 190, "Trophies": 1, "Stadium_Cap": 74310},
    "Chelsea":      {"Revenue_M": 594,  "Squad_Size": 28, "Avg_Salary_K": 5900, "Transfer_Spend_M": 320, "Trophies": 2, "Stadium_Cap": 40341},
    "Arsenal":      {"Revenue_M": 567,  "Squad_Size": 25, "Avg_Salary_K": 5400, "Transfer_Spend_M": 200, "Trophies": 1, "Stadium_Cap": 60704},
    "Juventus":     {"Revenue_M": 435,  "Squad_Size": 24, "Avg_Salary_K": 5100, "Transfer_Spend_M": 110, "Trophies": 2, "Stadium_Cap": 41507},
}

years = [2020, 2021, 2022, 2023, 2024]
rows = []

for club, base in base_data.items():
    for year in years:
        g = 2024 - year
        rows.append([
            club, year,
            round(base["Revenue_M"]       / (1.06 ** g)),
            base["Squad_Size"],
            round(base["Avg_Salary_K"]    / (1.05 ** g)),
            round(base["Transfer_Spend_M"]/ (1.04 ** g)),
            base["Trophies"],
            base["Stadium_Cap"]
        ])

df = pd.DataFrame(rows, columns=["Club","Year","Revenue_M","Squad_Size","Avg_Salary_K","Transfer_Spend_M","Trophies","Stadium_Cap"])
df.to_excel("football_clubs_data.xlsx", index=False)
print("football_clubs_data.xlsx created!")