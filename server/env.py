from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Optionally, enforce required variables (optional)
assert os.environ.get("DATABASE_URL"), "DATABASE_URL is required"
assert os.environ.get("DJANGO_SECRET_KEY"), "DJANGO_SECRET_KEY is required"
assert os.environ.get("CLOUDINARY_URL"), "CLOUDINARY_URL is required"
