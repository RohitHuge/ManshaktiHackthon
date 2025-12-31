# Use a stable Python version supported by PyTorch
FROM python:3.11-slim

# Prevent Python from writing .pyc files and buffering stdout
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies (minimal)
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --no-cache-dir --upgrade pip setuptools wheel

# Install PyTorch (CPU-only) first
RUN pip install --no-cache-dir torch \
    --index-url https://download.pytorch.org/whl/cpu

# Install SBERT + FastAPI stack
RUN pip install --no-cache-dir \
    sentence-transformers \
    fastapi \
    uvicorn

# Copy the SBERT service code
COPY sbert_service.py .

# Expose service port
EXPOSE 8001

# Start the SBERT embedding service
CMD ["uvicorn", "sbert_service:app", "--host", "0.0.0.0", "--port", "8001"]
