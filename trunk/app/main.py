from flask import Flask, render_template, request, json, abort, jsonify
import db_control as db
import collections
import datetime

app = Flask(__name__)
app.config['DEBUG'] = True

def get_date_time():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

@app.route("/")
@app.route('/index')
@app.route('/servers')
def servers():
    return page('servers')

@app.route('/svn')
def svn():
    return page('svn')

@app.route('/accounts')
def accounts():
    return page('accounts')

def page(_table_name):
    _table = db.get_all(_table_name)
    _column_names = db.get_columns_names(_table_name)
    return render_template("index.html",
        column_names = _column_names,
        table = _table,
        table_name = _table_name,
        title = "passwords tool")

@app.route("/get", methods=['GET'])
def get_password():
    _id = int(request.args.get("id"))
    _table_name = str(request.args.get("table_name"))
    return db.get_password(_table_name)[_id][0]

@app.route("/insert", methods=['POST'])
def set_record():
    data = collections.OrderedDict()
    if request.form:
        for k in request.form:
            data.update({k:request.form[k]})
        _table_name = data['table']
        del data['table']
        return db.insert_data(_table_name, data)
    return "POST method error"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
