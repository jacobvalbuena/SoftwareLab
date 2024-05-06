from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_restful import Api
from server.api import UserLogin, UserRegistration, AddProject, JoinProject, CheckIn, CheckOut, GetHardwareSets, GetProjectsSets
from server.database import DatabaseManager
import os

app = Flask(__name__, static_folder='client/build', static_url_path='/')
CORS(app)  # Allow CORS for all routes

# Connect to the database
DatabaseManager.connect()

api = Api(app)

# Define API routes
api.add_resource(UserLogin, '/api/login')
api.add_resource(UserRegistration, '/api/register')
api.add_resource(AddProject, '/api/addProject')
api.add_resource(JoinProject, '/api/joinProject')
api.add_resource(CheckIn, '/api/checkIn')
api.add_resource(CheckOut, '/api/checkOut')
api.add_resource(GetHardwareSets, '/api/getHardwareSets')
api.add_resource(GetProjectsSets, '/api/getProjectsSets')

# Serve index.html for GET requests to the root URL
@app.route("/", methods=["GET"])
def serve_index():
    return send_from_directory(app.static_folder, "index.html")

# Serve static files from the 'static' folder
@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

@app.route("/<path:dummy>")
def fallback(dummy):
    return send_from_directory(app.static_folder, "index.html")

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

#to force update git