from mongoengine import Document
from mongoengine.fields import StringField
import structlog

logger = structlog.get_logger()

# this is a Document Model

class AuthUser(Document):
    username = StringField(required=True, unique = False)
    userID = StringField(required=True, unique = True)
    password = StringField(required=True, unique=False)
    meta = { 
        'collection': 'Users'
    }
    
    @classmethod
    def get_auth_user_by_name(cls, userID: str):
        user = cls.objects(userID=userID).first() # return only the first query that matches from mongodb
        if user is None:
            logger.warn(f"No such user: {user}")
        return user # returns user object
    
