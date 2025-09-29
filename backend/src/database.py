import os
import psycopg2
from psycopg2 import pool
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        self.connection_pool = None
        self.create_connection_pool()
    
    def create_connection_pool(self):
        try:
            self.connection_pool = psycopg2.pool.SimpleConnectionPool(
                1, 20,
                user=os.getenv('DB_USER', 'masterhulkfung'),
                host=os.getenv('DB_HOST', 'localhost'),
                database=os.getenv('DB_NAME', 'chickalo'),
                password=os.getenv('DB_PASSWORD', ''),
                port=os.getenv('DB_PORT', 5432)
            )
            print("Database connection pool created successfully")
        except Exception as e:
            print(f"Error creating connection pool: {e}")
    
    def get_connection(self):
        return self.connection_pool.getconn()
    
    def return_connection(self, connection):
        self.connection_pool.putconn(connection)
    
    def close_all_connections(self):
        if self.connection_pool:
            self.connection_pool.closeall()

# Global database instance
db = Database()
