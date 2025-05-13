# FreshTrackAI

FreshTrackAI is an intelligent food management system that helps users reduce food waste and make the most of their groceries. It tracks product details—such as expiry dates and categories—via manual input or automated image analysis using **Google Vision AI**. The system then sends timely alerts before expiration and even recommends delicious recipes through a **Chef AI** powered by the **Hugging Face API**.

## Features

### Smart Input
- **Manual Entry**: Easily add food items and their expiry dates manually.
- **Image Recognition**: Upload an image of your food item or receipt—Google Vision AI extracts details like product name, category, and expiry date.

### Expiry Alert System
- Get reminders **before** your items expire, so you never waste food again.
- View a dashboard of items sorted by expiry urgency.

### Chef AI (Hugging Face API)
- Recommend creative and healthy **recipes** using items that are about to expire.
- Explore meal ideas for **any** food you have in your kitchen.
- Ensures optimal use of groceries with personalized suggestions.

## Tech Stack

- **Frontend**: HTML5 / CSS3
- **Backend**: Nodejs
- **Database**: MongoDB / PostgreSQL
- **AI Services**:
  - Google Vision AI (for image-based food data extraction)
  - Hugging Face Inference API (for recipe generation)
- **Notifications**: Email / Push Notifications (via Firebase or Twilio)

## Example Workflow

1. Add food items manually or upload a photo of your grocery/label.
2. Google Vision AI detects product and expiry details.
3. System stores and tracks the expiry timeline.
4. Get a reminder before an item goes bad.
5. Chef AI suggests recipes to use the item in a delicious dish!

## Installation & Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/FreshTrackAI.git
cd FreshTrackAI

# (Optional) Set up a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables for API keys
cp .env.example .env
# Add your Google Vision and Hugging Face API keys to .env

# Run the backend
uvicorn app.main:app --reload
