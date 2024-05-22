from flask_restful import Resource, reqparse
from pymongo import MongoClient

# this class is a RESTful API endpoint that will be used by frontend
# The Resource keyword encapsulates the logic for handling HTTP methods (Get, Post, Put, Delete)
class AddProject(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "name",
            type=str,
            required=True,
        )
        parser.add_argument(
            "id",
            type=str,
            required=True,
        )
        parser.add_argument(
            "description",
            type=str,
            required=True,
        )
        args = parser.parse_args()
        uri = ""
        # Create a new client and connect to the server
        client = MongoClient(uri)
        try:
            db = client.Projects
            user_doc = {
                "name": args["name"],
                "id": args["id"],
                "description": args["description"],
                "users": [],
                "Hardware Set 1": 0,
                "Hardware Set 2": 0
            }
            #dont add duplicates
            found = db.Projects.find_one( {"id": args["id"]})
            if found:
                return {"registration": False, "error": "this project id is already taken"}, 400
            db.Projects.insert_one(user_doc)
            print("Projecct Successfully Added")
            return {"registration": True, "message": "added project successfully"}, 200
        except Exception as e:
            print(f"Error adding user: {e}")
            return {"registration": False, "error": "ERROR: exception"}, 400
        finally:
            client.close()

class JoinProject(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "id",
            type=str,
            required=True,
        )
        args = parser.parse_args()
        uri = ""
        # Create a new client and connect to the server
        client = MongoClient(uri)
        try:
            print('here')
            db = client.Projects
            found = db.Projects.find_one( {"id": args["id"]})
            if found:
                print("Joined Project Successfully Added")
                return {"registration": True, "message": "updated project to add user successfully"}, 200
            return {"registration": False, "error": "ERROR: proj alr in db"}, 400
        except Exception as e:
            print(f"Error adding user: {e}")
            return {"registration": False, "error": "ERROR: exception"}, 400
        finally:
            client.close()

class CheckIn(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "HardwareSetName",
            type=str,
            required=True,
        )
        parser.add_argument(
            "id",
            type=str,
            required=True,
        )
        parser.add_argument(
            "amount",
            type=int,
            required=True,
        )
        args = parser.parse_args()
        uri = ""
        # Create a new client and connect to the server
        client = MongoClient(uri)
        try:
            db = client.HardwareSet
            found = db.HardwareSet.find_one( {"Description": args["HardwareSetName"]})
            found1 = client.Projects.Projects.find_one( { "id" : args['id'] } )

            if(found is None):
                return {"registration": False, "error": "cant find project id"}, 400
            db.HardwareSet.update_one(
                { "Description" : args['HardwareSetName'] },
                { "$set": { "Availability": found["Availability"] + args["amount"]} }
            )

            client.Projects.Projects.update_one(
                { "id" : args['id'] },
                { "$set": { args["HardwareSetName"]: found1[args["HardwareSetName"]] - args["amount"]} }
            )
            return {"registration": True, "newAvailability" : found["Availability"] + args["amount"]}, 200
        except Exception as e:
            print(f"Error adding user: {e}")
            return {"registration": False, "error": "ERROR: exception"}, 400
        finally:
            client.close()

class CheckOut(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "HardwareSetName",
            type=str,
            required=True,
        )
        parser.add_argument(
            "id",
            type=str,
            required=True,
        )
        parser.add_argument(
            "amount",
            type=int,
            required=True,
        )
        args = parser.parse_args()
        uri = "mongodb+srv://jisolahn:c8gg30DjhvPDkMD0@cluster0.ojbxo0c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        # Create a new client and connect to the server
        client = MongoClient(uri)
        try:
            db = client.HardwareSet
            found = db.HardwareSet.find_one( {"Description": args["HardwareSetName"]})
            found1 = client.Projects.Projects.find_one( { "id" : args['id'] } )
            if(found is None):
                return {"registration": False, "error": "ERROR: exception"}, 400
            db.HardwareSet.update_one(
                { "Description" : args['HardwareSetName'] },
                { "$set": { "Availability": found["Availability"] - args["amount"]} }
            )
            client.Projects.Projects.update_one(
                { "id" : args['id'] },
                { "$set": { args["HardwareSetName"]: found1[args["HardwareSetName"]] + args["amount"]} }
            )
            return {"registration": True, "newAvailability": found["Availability"] - args["amount"]}, 200
        except Exception as e:
            print(f"Error adding user: {e}")
            return {"registration": False, "error": "ERROR: exception"}, 400
        finally:
            client.close()


class GetHardwareSets(Resource):
    def get(self):
        uri = "mongodb+srv://jisolahn:c8gg30DjhvPDkMD0@cluster0.ojbxo0c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        # Create a new client and connect to the server
        client = MongoClient(uri)
        try:
            db = client.HardwareSet
            found1 = db.HardwareSet.find_one( {"Description": "Hardware Set 1"})
            found2 = db.HardwareSet.find_one( {"Description": "Hardware Set 2"})
            return {"registration": True, "hwset1" : found1["Availability"], "hwset2" : found2["Availability"]}, 200
        except Exception as e:
            print(f"Error adding user: {e}")
            return {"registration": False, "error": "ERROR: exception"}, 400
        finally:
            client.close()

class GetProjectsSets(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "id",
            type=str,
            required=True,
        )
        args = parser.parse_args()
        uri = "mongodb+srv://jisolahn:c8gg30DjhvPDkMD0@cluster0.ojbxo0c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        # Create a new client and connect to the server
        client = MongoClient(uri)
        try:
            db = client.Projects
            found1 = db.Projects.find_one( {"id": args["id"]})
            return {"registration": True, "hwset1" : found1["Hardware Set 1"], "hwset2" : found1["Hardware Set 2"]}, 200
        except Exception as e:
            print(f"Error adding user: {e}")
            return {"registration": False, "error": "ERROR: exception"}, 400
        finally:
            client.close()
