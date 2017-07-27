import psycopg2
import psycopg2.extras
from psycopg2 import IntegrityError

from config import db_conf

conn_string = """
    dbname='{0}'
    user='{1}'
    host='{2}'
    password='{3}'""".format(
    db_conf['name'],
    db_conf['user'],
    db_conf['host'],
    db_conf['password'])

#db = None
#db = psycopg2.connect(conn_string)
#cursor = db.cursor()

def sql_recuest(sql_string, commit = False):
    try:
        conn = psycopg2.connect(conn_string)
    except IntegrityError as e:
        return(e)
    cursor = conn.cursor()
    check = cursor.execute(sql_string)## check ??????
    if commit:
        conn.commit()
        return conn.close()
    else:
        return cursor.fetchall()

# def get_date_time():
#     return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def get_columns_names(table_name):
    SQL = """SELECT column_name
        FROM information_schema.columns
        WHERE table_name='{}'""".format(table_name)
    return sql_recuest(SQL)

def get_all(table_name):
    SQL = """SELECT * FROM {}""".format(table_name)
    return sql_recuest(SQL)

def get_password(_table_name):
    SQL = """SELECT password FROM {0}""".format(_table_name)
    return sql_recuest(SQL)

def insert_data(_table_name, data):
    columns = """\", \"""".join([key for key, val in data.items()])
    values = """\', \'""".join([val for key, val in data.items()])
    _id = """nextval('{0}_id_seq'::regclass)""".format(_table_name)
    SQL = """INSERT INTO {0} ("id", "{2}")
        VALUES ({1}, '{3}')""".format(_table_name, _id, columns, values)
    if sql_recuest(SQL, True):
        ret = sql_recuest(SQL, True)
    else:
        ret = """<script>alert("OK");history.go(-1);</script>"""
    return ret
    #return SQL
