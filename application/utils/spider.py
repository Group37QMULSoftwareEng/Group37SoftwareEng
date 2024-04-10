import requests
from lxml import html as htm
from application.utils.tool import get_db, get_date_time


def get_coin_rate():
    url = "https://www.coingecko.com/zh"

    proxy = {
        # "http": "http://127.0.0.1:10809",
        # "https": "http://127.0.0.1:10809"
    }

    headers = {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "referer": "https://www.coingecko.com/zh",
        "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
        "sec-ch-ua-arch": "\"x86\"",
        "sec-ch-ua-bitness": "\"64\"",
        "sec-ch-ua-full-version": "\"123.0.6312.86\"",
        "sec-ch-ua-full-version-list": "\"Google Chrome\";v=\"123.0.6312.86\", \"Not:A-Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"123.0.6312.86\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": "\"\"",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-ch-ua-platform-version": "\"10.0.0\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "content-length": "0",
        "origin": "https://www.coingecko.com",
        "Referer": "",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cache-Control": "no-cache",
        "Connection": "Upgrade",
        "Origin": "https://www.coingecko.com",
        "Pragma": "no-cache",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "content-type": "application/json",
        "Sec-WebSocket-Key": "nPJ+sthic0t+Q/Bbkm92+Q==",
        "Upgrade": "websocket",
        "Sec-WebSocket-Protocol": "actioncable-v1-json, actioncable-unsupported",
        "Sec-WebSocket-Version": "13",
        "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits"
    }
    cookies = {
        "_uc_referrer": "https://www.coingecko.com/zh?__cf_chl_tk=laDpq2QM3iFV_koAbj0_WuzGY6D1r421.lP7SAazZN4-1711889760-0.0.1.1-1557",
        "_gcl_au": "1.1.1420119096.1711889796",
        "_ga": "GA1.1.596452550.1711889796",
        "mp_4e762b32525bd7ecddda43ce51776343_mixpanel": "%7B%22distinct_id%22%3A%20%22%24device%3A18e949a99231440-07ffcd79075e7f-26001a51-1fa400-18e949a99231440%22%2C%22%24device_id%22%3A%20%2218e949a99231440-07ffcd79075e7f-26001a51-1fa400-18e949a99231440%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%7D",
        "__hstc": "234611265.8e826e527318c12b0fdef9a0f30f7877.1711890152864.1711890152864.1711890152864.1",
        "hubspotutk": "8e826e527318c12b0fdef9a0f30f7877",
        "__stripe_mid": "42304a7d-f4fe-4c8f-a304-5961a85a79ebe9aff7",
        "cf_clearance": "r1kK0p28IR1xJNlQ8FaMJHOx3sJN_GO6TCZ7l8qwqRQ-1711936454-1.0.1.1-wBolHXVaYfMGeSOv6o5oBJ3xUx8IEvpSfeEuyDMKliDvPzCmIgwF8aZ8s_Afnzjx_CqSKlNNl5X8hRijgKS0TA",
        "_session_id": "82348aa21423e071583c805e64fbc93e",
        "OptanonConsent": "isGpcEnabled=0&datestamp=Mon+Apr+01+2024+09%3A57%3A20+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202312.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=ad17b2d4-2564-4d4e-8d17-38304448a2ac&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0004%3A1%2CC0003%3A1&AwaitingReconsent=false",
        "_ga_1Y6C78JXR3": "GS1.1.1711936464.4.1.1711936641.0.0.0",
        "_ga_LJR3232ZPB": "GS1.1.1711936464.4.1.1711936642.0.0.0"
    }

    document = requests.get(url, headers=headers, cookies=cookies, proxies=proxy).text
    # print(document)

    html = htm.fromstring(document)

    trList = html.xpath('//table/tbody/tr')

    print(len(trList))

    db = get_db()

    coins = []
    for tr in trList:
        coin = tr.xpath('./td[3]/a/div/div/div/text()')[0]
        rate = tr.xpath('./td[5]/@data-sort')[0]
        coins.append({
            "name": coin.strip().encode("utf-8"),
            "rate": rate.strip().encode("utf-8"),
            "date": get_date_time()
        })

        # update coin rate
        res = db.table("coin").where({"name": coin.strip().encode("utf-8")}).save(
            {"rate": rate.strip().encode("utf-8")})
        if res:
            print(coin, rate, "update success")
        else:
            print(coin, rate, "update failed")

    print(coins)

    res = db.table("rate").addAll(coins)

    if res:
        print("coin save success")
    else:
        print("coin save failed")
        print(db.showError())


if __name__ == "__main__":
    get_coin_rate()
