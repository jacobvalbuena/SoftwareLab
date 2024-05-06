# To do
import mongoengine # ODM (object document mapper)

class DatabaseManager():

    @classmethod
    def connect(cls):
        try:
            uri = "mongodb+srv://jisolahn:c8gg30DjhvPDkMD0@cluster0.ojbxo0c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
            #projectDB = "Projects"
            #resourceDB = "Resources"
            userDB = "Users"
            #mongoengine.connect(host = uri, db = projectDB)
            #mongoengine.connect(host = uri, db = resourceDB)
            mongoengine.connect(host = uri, db = userDB)
        except Exception as e:
            print(f"Failed to connect to MongoDB: {e}")







        
