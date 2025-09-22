# google-ai-hackathon-ai-product-search

Projectct Steps:

1. We have inserted the dataset into bigquery from kaggle 
https://www.kaggle.com/datasets/hiteshsuthar101/myntra-fashion-product-dataset

2. Create embedding

CREATE OR REPLACE TABLE `temporal-sweep-471719-f5.suport_tickets.fashion_dataset` AS
SELECT * FROM ML.GENERATE_EMBEDDING(
  MODEL `temporal-sweep-471719-f5.suport_tickets.embedding_model`,
  (
    SELECT *,concat(name,brand,description,p_attributes) as content
    FROM `temporal-sweep-471719-f5.suport_tickets.fashion_dataset`
  )
)
WHERE TRUE;

3. Clear data that failed with embeddings

delete from `temporal-sweep-471719-f5.suport_tickets.fashion_dataset` where array_length( ml_generate_embedding_result) != 768


4. Now use VECTOR_SEARCH of big query

## Frontend - Guide
```cd frontend```
```npm install```
```npm run dev```
In browser got to http://localhost:5173

## Backend - Guid
```cd backend```
```python3.12 -m venv .venv```
```source .venv/bin/activate``` - activate your venv
```pip install -r requirements.txt``` - install all libraries

name your biquery service account crendtials json as "backend/big_query_conn.json"