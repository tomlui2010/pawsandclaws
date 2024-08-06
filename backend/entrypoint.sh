#!/bin/sh

# Wait for PostgreSQL to be ready
python << END
import time
import psycopg2
from psycopg2 import OperationalError

def wait_for_postgres():
    while True:
        try:
            conn = psycopg2.connect(
                dbname="pets",
                user="postgres",
                password="postgres",
                host="postgres",
                port="5432"
            )
            conn.close()
            break
        except OperationalError:
            time.sleep(1)

wait_for_postgres()
END

echo "PostgreSQL started"

# Run the application
exec "$@"
