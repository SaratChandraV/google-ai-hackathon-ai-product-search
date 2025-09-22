from google.cloud import bigquery
from google.oauth2 import service_account
import pandas as pd

# Initialize a BigQuery client
credentials = service_account.Credentials.from_service_account_file('big_query_conn.json')
client = bigquery.Client(credentials=credentials)

# Define a simple query
query = """
    SELECT * FROM `temporal-sweep-471719-f5.suport_tickets.fashion_dataset`
"""

# Execute the query
query_job = client.query(query)

#  convert to pandas DataFrame (optional)
df = query_job.to_dataframe()
print(df)

df.to_excel('output.xlsx', index=False)