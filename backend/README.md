# FastAPI Backend for Ad Insights Explorer Lite

This is the backend service for Ad Insights Explorer Lite, built with FastAPI. It provides API endpoints for analyzing post data, detecting anomalies, and generating summaries.

## Project Structure

- `app/` - Main application code
  - `main.py` - FastAPI app entrypoint
  - `api/` - API route definitions
  - `models/` - Pydantic models for data validation and serialization
  - `services/` - Business logic and data processing
- `tests/` - Unit and integration tests
- `requirements.txt` - Python dependencies
- `README.md` - Project documentation

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd ad-insights/backend
   ```
2. **Create a virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Run the FastAPI server:**
   ```bash
   uvicorn app.main:app --reload
   ```

## Running Tests

From the `backend/` directory, run:

```bash
pytest
```

## API Endpoints

- `/posts/` - List all posts
- `/anomalies/` - Detect posts with anomalies (short titles, duplicates, similar titles)
- `/summary/` - Get summary statistics (top users by unique words, most common words)

## Notes

- Use `requirements.txt` to manage dependencies.
- For environment variables, use a `.env` file (not included by default).

---

For more details, see the code in the `app/` and `tests/` directories.
