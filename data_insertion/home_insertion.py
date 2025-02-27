import firebase_admin
from firebase_admin import credentials, firestore
import random

# Initialize Firebase Admin SDK
cred = credentials.Certificate(
    "serviceAccountKey.json"
)  # Path to Firebase private key JSON
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

# Reference to the Firestore collection
fiber_ezz_ref = db.collection("FiberEzz")

# ISP Companies
companies = ["Jio", "Airtel", "BSNL", "ACT"]

# Sample home locations near Jayanagar & JP Nagar with company assignments
home_locations = [
    {
        "id": "house_008",
        "location": "12.9190,77.5820",
        "status": "active",
        "provider": "Jio",
    },
    {
        "id": "house_009",
        "location": "12.9220,77.5900",
        "status": "active",
        "company": "Jio",
    },
    {
        "id": "house_0010",
        "location": "12.9245,77.5855",
        "status": "active",
        "company": "Jio",
    },
    {
        "id": "house_0011",
        "location": "12.9100,77.6000",
        "status": "active",
        "company": "Airtel",
    },
    {
        "id": "house_0012",
        "location": "12.9125,77.6055",
        "status": "active",
        "company": "Airtel",
    },
    {
        "id": "house_0013",
        "location": "12.9170,77.6080",
        "status": "active",
        "company": "Airtel",
    },
    {
        "id": "house_0014",
        "location": "12.9300,77.5805",
        "status": "active",
        "company": "BSNL",
    },
    {
        "id": "house_0015",
        "location": "12.9285,77.5950",
        "status": "active",
        "company": "BSNL",
    },
    {
        "id": "house_0016",
        "location": "12.9260,77.6010",
        "status": "active",
        "company": "BSNL",
    },
    {
        "id": "house_0017",
        "location": "12.9210,77.5865",
        "status": "active",
        "company": "ACT",
    },
    {
        "id": "house_0018",
        "location": "12.9205,77.5920",
        "status": "active",
        "company": "ACT",
    },
    {
        "id": "house_0019",
        "location": "12.9230,77.5980",
        "status": "active",
        "company": "ACT",
    },
]

# Insert new data into Firestore
for home in home_locations:
    fiber_ezz_ref.add(home)

print("New data inserted successfully!")

# Updating existing documents to add 'company' field
docs = fiber_ezz_ref.stream()
for doc in docs:
    fiber_ezz_ref.document(doc.id).update({"company": random.choice(companies)})

print("Updated existing homes with 'company' field.")
