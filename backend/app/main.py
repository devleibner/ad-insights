from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Ad Insights Explorer Lite API", version="1.0.0")

# CORS setup for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers will be included here
from app.api import posts
from app.api import anomalies
from app.api import summary
app.include_router(posts.router)
app.include_router(anomalies.router)
app.include_router(summary.router)

@app.get("/")
def root():
    return {"message": "Ad Insights Explorer Lite API is running."}
