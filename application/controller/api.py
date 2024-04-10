from flask import session, redirect, current_app
from flask import Blueprint
from flask import request
from ..utils.tool import *

api = Blueprint('api', __name__)


@api.route('/')
def index():
    return redirect('./index.html')


@api.route('/api/upload', methods=["POST"])
def upload():
    if not request.files['file'] or request.files['file'] == '':
        return jsonResponse(500, "Not found file")
    file = request.files['file']

    if "." not in file.filename:
        return jsonResponse(500, "Not found file type")

    file_type = file.filename.split(".")[-1]
    save_name = md5(file.filename + str(time.time())) + '.' + file_type
    save_path = '/static/uploads/avatar/' + save_name
    file.save(current_app.root_path + save_path)
    return jsonResponse(200, "upload success", '/uploads/avatar/' + save_name)


@api.route('/api/login', methods=['POST'])
def login():
    db = get_db()
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    user = db.table('user').where({"username|email": username, "password": password}).find()

    if user is None:
        return jsonResponse(500, 'account or password error', None)

    # if user["state"] == 1:
    #     return jsonResponse(500, 'account has been locked', None)

    # save log
    logger(user["id"], "Login", "login success, ip:" + request.environ.get('HTTP_X_REAL_IP', request.remote_addr))

    db.close()
    session['user'] = user  # save user sessionn
    return jsonResponse(200, 'success', user)


@api.route('/api/register', methods=["POST"])
def register():
    db = get_db()
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")
    phone = data.get("phone")
    user = db.table('user').where({"username": username}).find()

    if user:
        return jsonResponse(500, 'User already exists', None)

    # create user
    res = db.table('user').add({
        "username": username,
        "password": password,
        "email": email,
        "phone": phone
    })

    db.close()
    if res:
        return jsonResponse(200, 'Register success', None)
    return jsonResponse(500, 'Register failed', user)


@api.route('/api/coin/list', methods=["GET"])
def coin_list():
    db = get_db()

    coins = db.table("coin").order("rate desc").limit(100).select()
    db.close()
    if coins:
        return jsonResponse(200, 'Get coins success', coins)
    return jsonResponse(500, 'Get coins failed')


@api.route('/api/coin/rate', methods=["GET"])
def coin_rate():
    db = get_db()
    name = request.args.get("name")

    coins = db.table("rate").order("date asc").where({"name": name}).select()
    db.close()
    if coins:
        return jsonResponse(200, 'Get coins success', coins)
    return jsonResponse(500, 'Get coins failed')


@api.route('/api/coin/rate/list', methods=["GET"])
def coin_rate_list():
    db = get_db()

    coins = db.table("rate").order("date desc").where("name in ('BTC','WBTC','MKR','RETH','WEETH')").field(
        'name,GROUP_CONCAT(rate ORDER BY date desc) as rate').group("name").order("date desc").select()
    db.close()
    if coins:
        return jsonResponse(200, 'Get coins rate list success', coins)
    print(db.showError())
    return jsonResponse(500, 'Get coins failed')


@api.route('/api/logs', methods=["GET"])
def get_logs():
    params = request.args.to_dict()
    print(params)

    # page = int(params.get("pageNo", 1))
    # limit = int(params.get("pageSize", 10))

    user_id = params.get("user_id")

    db = get_db()

    # build condition
    condition = {
        "id": ["EGT", 1, "", "e"]
    }

    if user_id:
        condition["user_id"] = user_id

    # total
    total = db.table('logs').where(condition).count()

    # list
    list = db.table('logs').where(condition).order("create_at desc").select()

    db.close()
    result = {"total": total, "list": list}
    return jsonResponse(200, "success", result)


@api.route('/api/transaction', methods=["GET"])
def get_transaction():
    params = request.args.to_dict()
    print(params)

    page = int(params.get("pageNo", 1))
    limit = int(params.get("pageSize", 10))

    transaction_id = params.get("transaction_id")
    state = params.get("state")
    to_user_id = params.get("to_user_id")
    from_user_id = params.get("from_user_id")
    start_date = params.get("start_date")
    end_date = params.get("end_date")
    delete = params.get("delete_at", 0)

    db = get_db()

    # build condition
    condition = {
        "transaction.id": ["EGT", 1, "", "e"]
    }

    if delete != "all":
        condition["delete_at"] = delete

    if transaction_id:
        condition["transaction_id"] = ["LIKE", '%' + transaction_id + '%', "", "e"]

    if state:
        condition["transaction.state"] = state

    if to_user_id:
        condition["to_user_id"] = to_user_id

    if from_user_id:
        condition["from_user_id"] = from_user_id

    if start_date and end_date:
        condition["transaction.create_at"] = ["BETWEEN", [start_date, end_date], "", "e"]

    # total
    total = db.table('transaction').where(condition).where("delete_at is not null").count()

    # list
    list = (db.table('transaction').
            join(["user u1 on u1.id=transaction.from_user_id", "left"]).
            join(["user u2 on u2.id=transaction.to_user_id", "left"]).
            field(
        "transaction.*,u1.username as from_username,u2.username as to_username,u1.avatar as from_avatar,u2.avatar as to_avatar").
            where(condition).order("create_at desc").page(page, limit).select())

    db.close()
    result = {"total": total, "list": list}
    print(result)
    return jsonResponse(200, "success", result)


@api.route('/api/transaction', methods=["POST"])
def post_transaction():
    params = request.get_json()  # receive data
    print(params)

    to_wallet_id = params.get("to_wallet_id")
    from_wallet_id = params.get("from_wallet_id")
    amount = float(params.get("amount"))
    user_id = params.get("user_id")
    description = params.get("description")

    if not to_wallet_id:
        return jsonResponse(500, 'wallet address is required')

    if not from_wallet_id:
        return jsonResponse(500, 'please select wallet')

    if not amount:
        return jsonResponse(500, 'amount is required')

    # db instance
    db = get_db()

    # Check for frequent transactions
    # past 10 minutes
    start = datetime.datetime.now() - datetime.timedelta(minutes=10)
    end = datetime.datetime.now()
    range = ["BETWEEN", [start.strftime("%Y-%m-%d %H:%M:%S"), end.strftime("%Y-%m-%d %H:%M:%S")], "", "e"]

    # check transaction amount
    count = db.table("transaction").where({"create_at": range, "from_user_id": user_id}).count()

    # update count
    db.table("user").where({"id": user_id}).setInc('count_trans')

    # get user count
    from_user = db.table("user").where({"id": user_id}).find()

    if count >= 5 and from_user['count_trans'] >= 5:
        # block wallet
        db.table("wallet").where({"hash_id": from_wallet_id}).save({"state": 0})
        # block user
        db.table("user").where({"id": user_id}).save({"state": 0})

        logger(user_id, "Block Wallet", content="block wallet success, wallet address:" + from_wallet_id)
        logger(user_id, "Block User", content="block user success, user id:" + str(user_id))
        return jsonResponse(500, 'You have made too many transactions,Account temporarily blocked')

    # check user state

    if from_user["state"] == 0:
        return jsonResponse(500, 'Your account has been locked')

    # check wallet address
    to_wallet = db.table("wallet").where({"hash_id": to_wallet_id}).find()

    if not to_wallet:
        return jsonResponse(500, 'wallet address is error')

    # check wallet state
    if to_wallet["state"] == 0:
        return jsonResponse(500, 'Target Wallet has been locked')

    to_user = db.table("user").where({"id": to_wallet["user_id"]}).find()
    if to_user["state"] == 0:
        return jsonResponse(500, 'Target User has been locked')

    # from wallet
    from_wallet = db.table("wallet").where({"hash_id": from_wallet_id}).find()

    if from_wallet["user_id"] == to_wallet["user_id"]:
        return jsonResponse(500, 'Transfer must be between different users')

    # check wallet state
    if from_wallet["state"] == 0:
        return jsonResponse(500, 'Source Wallet has been locked')

    # from currency
    from_currency = db.table("coin").where({"id": from_wallet["coin_id"]}).find()

    # to currency
    to_currency = db.table("coin").where({"id": to_wallet["coin_id"]}).find()

    # check balance
    if from_wallet["balance"] < amount:
        return jsonResponse(500, 'balance is not enough')

    # transfer from currency to usd
    usd = amount * from_currency["rate"]

    # transfer usd to currency
    target_currency_amount = usd / to_currency["rate"]

    # calculate
    dec_amount = db.table('wallet').where({"hash_id": from_wallet_id}).setDec("balance", amount)

    if not dec_amount:
        return jsonResponse(500, 'Transfer failed')

    # target wallet
    inc_amount = db.table('wallet').where({"hash_id": to_wallet_id}).setInc("balance", target_currency_amount)

    if not inc_amount:
        return jsonResponse(500, 'Transfer failed')

    # save transaction
    data = {
        "transaction_id": md5(str(from_wallet_id) + to_wallet_id + get_date_time()),
        "from_user_id": user_id,
        "to_user_id": to_wallet["user_id"],
        "from_wallet_id": from_wallet_id,
        "to_wallet_id": to_wallet_id,
        "from_currency_name": from_currency["name"],
        "to_currency_name": to_currency["name"],
        "from_currency_rate": from_currency["rate"],
        "to_currency_rate": to_currency["rate"],
        "amount": amount,
        "money": usd,
        "remark": description,
        "state": 1,
        "create_at": get_date_time(),
    }

    res = db.table('transaction').add(data)  # insert data

    # db.close()

    if res:
        # save log
        content = f"Transfer to Wallet {to_wallet_id} \n {amount} {from_currency['name']} to {target_currency_amount} {to_currency['name']}"
        logger(user_id, "Transfer", content)
        return jsonResponse(200, 'success', res)
    return jsonResponse(500, 'failed')


@api.route('/api/transaction', methods=["PUT"])
def put_transaction():
    data = request.get_json()  # receive data
    print(data)

    # db instance
    db = get_db()

    res = db.table('transaction').where({"id": data["id"]}).save(data)  # insert data
    # print(db.showError())
    db.close()
    if res:
        return jsonResponse(200, 'success', res)
    return jsonResponse(500, 'failed')


@api.route('/api/transaction', methods=["DELETE"])
def delete_transaction():
    id = request.args.get("id")
    print(id)
    db = get_db()

    result = db.table('transaction').where({"id": id}).delete()
    if result:
        return jsonResponse(200, 'success', result)
    return jsonResponse(500, 'failed')


@api.route('/api/wallet', methods=["GET"])
def get_wallet():
    params = request.args.to_dict()
    print(params)

    page = int(params.get("pageNo", 1))
    limit = int(params.get("pageSize", 10))

    user_id = params.get("user_id")
    db = get_db()

    # build condition
    condition = {
        "id": ["EGT", 1, "", "e"]
    }
    if user_id:
        condition["user_id"] = user_id

    # total
    total = db.table('wallet').where(condition).count()

    # list
    list = db.table('wallet').where(condition).order("create_at desc").page(page, limit).select()

    db.close()
    result = {"total": total, "list": list}
    return jsonResponse(200, "success", result)


@api.route('/api/wallet', methods=["POST"])
def post_wallet():
    data = request.get_json()  # receive data
    print(data)

    data["hash_id"] = md5(str(data["user_id"]) + data["name"] + get_date_time())

    # db instance
    db = get_db()
    res = db.table('wallet').add(data)  # insert data

    db.close()
    if res:
        # save log
        logger(data["user_id"], "Create Wallet",
               "create wallet success, name:" + data["name"] + ", address:" + data["hash_id"])
        return jsonResponse(200, 'success', res)
    return jsonResponse(500, 'failed')


@api.route('/api/wallet', methods=["PUT"])
def put_wallet():
    data = request.get_json()  # receive data
    print(data)

    # db instance
    db = get_db()
    res = db.table('wallet').where({"id": data["id"]}).save(data)  # insert data

    db.close()
    if res:
        # save log
        logger(data["user_id"], "Update Wallet",
               content="update wallet success, name:" + data["name"] + ", address:" + data["hash_id"])
        return jsonResponse(200, 'success', res)
    return jsonResponse(500, 'failed')


@api.route('/api/wallet', methods=["DELETE"])
def delete_wallet():
    id = request.args.get("id")
    print(id)

    db = get_db()
    wallet = db.table('wallet').where({"id": id}).find()
    result = db.table('wallet').where({"id": id}).delete()
    db.close()
    if result:
        # save log
        logger(wallet["user_id"], "Delete Wallet", content="delete wallet success, address:" + wallet["hash_id"])
        return jsonResponse(200, 'success', result)
    return jsonResponse(500, 'failed')


@api.route('/api/wallet/transfer', methods=["POST"])
def post_wallet_transfer():
    data = request.get_json()  # receive data
    print(data)

    amount = float(data.get("amount"))
    from_wallet_id = data.get("from_wallet_id")
    to_wallet_id = data.get("to_wallet_id")

    # db instance
    db = get_db()

    # from wallet
    from_wallet = db.table('wallet').where({"id": from_wallet_id}).find()

    # check wallet state
    if from_wallet["state"] == 0:
        return jsonResponse(500, 'Source Wallet has been locked')

    # to wallet
    to_wallet = db.table('wallet').where({"id": to_wallet_id}).find()

    # check wallet state
    if to_wallet["state"] == 0:
        return jsonResponse(500, 'Target Wallet has been locked')

    # from currency
    from_currency = db.table('coin').where({"id": from_wallet["coin_id"]}).find()

    # to currency
    to_currency = db.table('coin').where({"id": to_wallet["coin_id"]}).find()

    # calculate
    if from_wallet["balance"] < amount:
        return jsonResponse(500, 'Balance not enough')

    # transfer from currency to usd
    usd = amount * from_currency["rate"]

    # transfer usd to currency
    target_currency_amount = usd / to_currency["rate"]

    # calculate
    dec_amount = db.table('wallet').where({"id": from_wallet_id}).setDec("balance", amount)

    if not dec_amount:
        return jsonResponse(500, 'Transfer failed')

    # target wallet
    inc_amount = db.table('wallet').where({"id": to_wallet_id}).setInc("balance", target_currency_amount)

    # close db
    db.close()

    if inc_amount:
        # save log
        logger(from_wallet["user_id"], "Transfer",
               content="transfer success, from:" + from_wallet["hash_id"] + ", to:" + to_wallet[
                   "hash_id"] + ", amount:" + str(amount))
        return jsonResponse(200, 'Transfer success')
    return jsonResponse(500, 'Transfer failed')


@api.route('/api/user', methods=["GET"])
def get_user():
    params = request.args.to_dict()
    print(params)

    page = int(params.get("pageNo", 1))
    limit = int(params.get("pageSize", 10))

    username = params.get("username")
    email = params.get("email")
    state = params.get("state")
    phone = params.get("phone")

    db = get_db()

    # build condition
    condition = {
        "id": ["EGT", 1, "", "e"]
    }

    if username:
        condition["username"] = ["LIKE", '%' + username + '%', "", "e"]

    if email:
        condition["email"] = ["LIKE", '%' + email + '%', "", "e"]

    if phone:
        condition["phone"] = ["LIKE", '%' + phone + '%', "", "e"]

    if state:
        condition["state"] = state

    # total
    total = db.table('user').where(condition).count()

    # list
    list = db.table('user').where(condition).order("create_at desc").page(page, limit).select()

    db.close()
    result = {"total": total, "list": list}
    return jsonResponse(200, "success", result)


@api.route('/api/user', methods=["POST"])
def post_user():
    data = request.get_json()  # receive data
    print(data)

    # db instance
    db = get_db()

    user = db.table('user').where({"username": data["username"]}).find()

    if user:
        return jsonResponse(500, 'User already exists', None)

    res = db.table('user').add(data)  # insert data

    db.close()
    if res:
        return jsonResponse(200, 'success', res)
    return jsonResponse(500, 'failed')


@api.route('/api/user', methods=["PUT"])
def put_user():
    data = request.get_json()  # receive data
    print(data)

    # db instance
    db = get_db()

    user = db.table('user').where({"username": data["username"]}).find()

    if user and user["id"] != data["id"]:
        return jsonResponse(500, 'User already exists', None)

    if request.args.get("isChangeBlock") == "true":
        # update user wallet state
        db.table('wallet').where({"user_id": data["id"]}).save({"state": data["state"]})
        if data["state"] == "1" or data["state"] == 1:
            # reset count
            data["count_trans"] = 0
    res = db.table('user').where({"id": data["id"]}).save(data)  # insert data
    db.close()
    if res:
        return jsonResponse(200, 'success', res)
    return jsonResponse(500, 'failed')


@api.route('/api/user', methods=["DELETE"])
def delete_user():
    id = request.args.get("id")
    print(id)

    db = get_db()
    result = db.table('user').where({"id": id}).delete()
    db.close()
    if result:
        # delete wallet
        db.table("wallet").where({"user_id":id}).delete()

        # delete wallet address
        db.table("wallet_address").where({'user_id':id}).delete()

        # delete transactions
        db.table("transaction").where({'user_id':id}).delete()

        # delete get_logs
        db.table("logs").where({"user_id":id}).delete()

        return jsonResponse(200, 'success', result)
    return jsonResponse(500, 'failed')


@api.route('/api/wallet/address', methods=["GET"])
def get_wallet_address():
    params = request.args.to_dict()
    print(params)

    user_id = params.get("user_id")

    db = get_db()

    # build condition
    condition = {
        "id": ["EGT", 1, "", "e"]
    }

    if user_id:
        condition["user_id"] = user_id

    # list
    list = db.table('wallet_address').where(condition).order("create_at desc").select()

    db.close()

    result = {"list": list}

    return jsonResponse(200, "success", result)


@api.route('/api/wallet/address', methods=["POST"])
def post_wallet_address():
    data = request.get_json()  # receive data
    print(data)

    # db instance
    db = get_db()

    wallet_address = db.table('wallet_address').where({"user_id": data["user_id"], "address": data["address"]}).find()
    if wallet_address:
        return jsonResponse(500, 'Address has exists')

    data["create_at"] = get_date_time()

    res = db.table('wallet_address').add(data)  # insert data

    db.close()
    if res:
        # save log
        logger(data["user_id"], "Create Wallet Address",
               "create wallet address success, address:" + data["address"] + ", remark:" + data["remark"])
        return jsonResponse(200, 'success', res)
    return jsonResponse(500, 'failed')


@api.route('/api/wallet/address', methods=["DELETE"])
def delete_wallet_address():
    id = request.args.get("id")
    print(id)

    db = get_db()
    wallet_address = db.table('wallet_address').where({"id": id}).find()
    result = db.table('wallet_address').where({"id": id}).delete()
    db.close()
    if result:
        # save log
        logger(wallet_address["user_id"], "Delete Wallet Address",
               content="delete wallet address success, address:" + wallet_address["address"])
        return jsonResponse(200, 'success', result)
    return jsonResponse(500, 'failed')


@api.route('/api/analy/user', methods=["GET"])
def analy_user():
    params = request.args.to_dict()
    print(params)

    start = params.get("start")
    end = params.get("end")

    db = get_db()

    # build condition
    condition = {
        "id": ["EGT", 1, "", "e"]
    }

    if start and end:
        condition["create_at"] = ["BETWEEN", [start, end], "", "e"]

    # today new user
    today_start = datetime.datetime.now().strftime("%Y-%m-%d 00:00:00")
    today_end = datetime.datetime.now().strftime("%Y-%m-%d 23:59:59")
    time_range = ["BETWEEN", [today_start, today_end], "", "e"]

    today_new_user = db.table('user').where({"create_at": time_range}).count()
    today_new_transaction = db.table('transaction').where({"create_at": time_range}).count()

    # all user
    all_user = db.table('user').count()

    # list
    data = db.table('user').where(condition).field("DATE(create_at) as k, count(*) as v").group(
        "DATE(create_at)").order("create_at asc").select()

    # print(db.getLastSql())

    # close db connection
    db.close()

    result = {
        "today_new_user": today_new_user,
        "today_new_transaction": today_new_transaction,
        "all_user": all_user,
        "list": data
    }
    return jsonResponse(200, "success", result)


@api.route('/api/analy/transaction', methods=["GET"])
def analy_transaction():
    params = request.args.to_dict()
    print(params)

    start = params.get("start")
    end = params.get("end")

    db = get_db()

    # build condition
    condition = {
        "id": ["EGT", 1, "", "e"],
        "delete_at": 0
    }

    if start and end:
        condition["create_at"] = ["BETWEEN", [start, end], "", "e"]

    # list
    data = db.table('transaction').where(condition).field("DATE(create_at) as k, count(*) as v").group(
        "DATE(create_at)").order("create_at asc").select()

    # close db connection
    db.close()

    result = {
        "list": data
    }
    return jsonResponse(200, "success", result)
