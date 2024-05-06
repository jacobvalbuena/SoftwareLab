from flask_restful import Resource, reqparse
from server.models.auth_user import AuthUser


# this class is a RESTful API endpoint that will be used by frontend
# The Resource keyword encapsulates the logic for handling HTTP methods (Get, Post, Put, Delete)



class UserRegistration(Resource):
    def encrypt(inputText): #given that inputText does not have an ! or 'space' // reverse string then shift 
        N = 14
        D = 1

        reversedInputText = inputText[::-1]
        reversedEncryptedText = ""

        if D == 1:  # Right shift
            for character in reversedInputText:
                shiftedCharValue = ord(character) + N
                while (shiftedCharValue > 126):
                    shiftedCharValue -= 93
                reversedEncryptedText += chr(shiftedCharValue)

        else: # left shift
            for character in reversedInputText:
                shiftedCharValue = ord(character) - N
                while (shiftedCharValue < 34):
                    shiftedCharValue += 93
                reversedEncryptedText += chr(shiftedCharValue)
            
        return reversedEncryptedText

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "username",
            type=str,
            required=True,
        )
        parser.add_argument(
            "userID",
            type=str,
            required=True,
        )
        parser.add_argument(
            "password",
            type=str,
            required=True,
        )
        args = parser.parse_args()

        if args["username"] == "":
            return {"registration": False, "error": "ERROR: Please enter a display name"}
        if len(args["userID"]) < 3:
            return {"registration": False, "error": "ERROR: Username must be at least 3 characters long"}
        if len(args["password"]) < 5:
            return {"registration": False, "error": "ERROR: Password must be at least 5 characters long"}
        if " " in args["userID"] or "!" in args["userID"]:
            return {"registration": False, "error": "ERROR: Username cannot contain spaces or exclamation marks"}
        if " " in args["userID"] or "!" in args["password"]:
            return {"registration": False, "error": "ERROR: Password cannot contain spaces or exclamation marks"}

        try:
            user = AuthUser.get_auth_user_by_name(args["userID"])
            if user:
                return {"registration": False, "error": "ERROR: Username is taken"}, 200
            else:
                args["password"] = UserRegistration.encrypt(args["password"]) # encrypt password
                new_user = AuthUser(username=args["username"], userID=args["userID"], password=args["password"]) # create new AuthUser object
                new_user.save() # save to mongodb
                return {"registration": True}, 200
        except Exception as e:
            print(f"Error adding user: {e}")
            return {"registration": False, "error": "ERROR: exception"}, 400
     


class UserLogin(Resource):
     def decrypt(reversedEncryptedText): #shifts then reverses
        N = 14
        D = 1

        decryptedText = ""
        if D == 1: #right shift specified (reversed so do a left shfit)
            for character in reversedEncryptedText:
                shiftedCharValue = ord(character) - N
                while (shiftedCharValue < 34):
                    shiftedCharValue += 93
                decryptedText += chr(shiftedCharValue)
        else: #left shift specified (reversed so do a right shift)
            for character in reversedEncryptedText:
                shiftedCharValue = ord(character) + N
                while (shiftedCharValue > 126):
                    shiftedCharValue -= 93
                decryptedText += (chr(shiftedCharValue))

        originalText = decryptedText[::-1]
        return originalText
        #note:  ord() returns the corresponding ASCII value of character and after adding integer to it, chr() again converts it into character

     def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "userID",
            type=str,
            required=True,
        )
        parser.add_argument(
            "password",
            type=str,
            required=True,
        ) 
        args = parser.parse_args()

        try:
            auth_user = AuthUser.get_auth_user_by_name(args["userID"]) # query AuthUser collection
            if not auth_user:
                return {"login": False, "error": "Account does not exist"}
            
            decryptedPW = UserLogin.decrypt(auth_user.password) # decrypt password
            if args["password"] == decryptedPW:
                return {
                    "login": True, "username": auth_user.username
                }, 200
            else:
                return {"login": False, "error": "Incorrect password"}, 401
            
        except Exception as e:
            print(f"Error querying availability: {e}")
            return {"login": False}, 400

        
