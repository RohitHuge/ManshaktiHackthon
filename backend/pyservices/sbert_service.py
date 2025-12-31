from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

# Load model once at startup
model = SentenceTransformer(
    "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
)

app = FastAPI(title="SBERT Embedding Service")

class EmbedRequest(BaseModel):
    text: str

class EmbedResponse(BaseModel):
    embedding: list[float]

@app.post("/embed", response_model=EmbedResponse)
def embed_text(req: EmbedRequest):
    if not req.text or len(req.text.strip()) < 5:
        raise HTTPException(
            status_code=400,
            detail="Text too short to embed"
        )

    vector = model.encode(req.text).tolist()
    return {"embedding": vector}
