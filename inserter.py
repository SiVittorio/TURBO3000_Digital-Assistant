import psycopg2

def selectAll():
    cursor.execute('SELECT * FROM requests')
    requests = cursor.fetchall()
    print(requests)

def insertInto(idUser, userName, request):
    sql = 'INSERT INTO requests (id_Users, user_name, request) VALUES (' + str(idUser) + ', \'' + userName + '\'' + ', \'' + request + '\')'
    cursor.execute(sql)
    selectAll()

conn = psycopg2.connect(dbname='grants.myrosmol', user='postgres', 
                        password='1111', host='localhost')
with conn.cursor() as cursor:
    conn.autocommit = True
    insertInto(input(), input(), input())

conn.close()

