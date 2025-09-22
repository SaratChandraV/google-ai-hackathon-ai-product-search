from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import bigquery
from google.oauth2 import service_account
import pandas as pd
from pydantic import BaseModel


# Initialize a BigQuery client
credentials = service_account.Credentials.from_service_account_file('big_query_conn.json')
client = bigquery.Client(credentials=credentials)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust origins as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI server with CORS enabled!"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

class QueryRequest(BaseModel):
    query: str

@app.post("/query")
async def run_query(request: QueryRequest):
    query = request.query
    sql_query = """
        SELECT base.name,base.img,base.price,base.brand, base.avg_rating
        FROM VECTOR_SEARCH(
        TABLE `temporal-sweep-471719-f5.suport_tickets.fashion_dataset`, 'ml_generate_embedding_result',
        (
        SELECT ml_generate_embedding_result, content AS query
        FROM ML.GENERATE_EMBEDDING(
        MODEL `temporal-sweep-471719-f5.suport_tickets.embedding_model`,
        (SELECT '""" + query + """' AS content))
        ),
        top_k => 6)"""
    # Execute the query
    print("Executing query:", sql_query)
    query_job = client.query(sql_query)
    df = query_job.to_dataframe()
    df.fillna(0, inplace=True)
    df = df.astype(str)
    return df.to_dict(orient='records')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)