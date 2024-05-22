# To do
import mongoengine # ODM (object document mapper)

class DatabaseManager():

    @classmethod
    def connect(cls):
        try:
            uri = ""
            #projectDB = "Projects"
            #resourceDB = "Resources"
            userDB = "Users"
            #mongoengine.connect(host = uri, db = projectDB)
            #mongoengine.connect(host = uri, db = resourceDB)
            mongoengine.connect(host = uri, db = userDB)
        except Exception as e:
            print(f"Failed to connect to MongoDB: {e}")







        
