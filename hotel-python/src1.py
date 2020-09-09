import paho.mqtt.client as mqtt
import time

broker_address = "192.168.137.1"
subTopic = "hotel/+/relay"

import pymongo

dbClient = pymongo.MongoClient(
    "mongodb+srv://minhtaile2712:imissyou@cluster0-wyhfl.mongodb.net/test?retryWrites=true&w=majority")
db = dbClient.test
dbRooms = db.rooms
localRooms = []


def initiatefromdb():
    for room in dbRooms.find({}, projection={'_id': False, 'name': True, 'state': True}):
        localRooms.append(room)
    for room in localRooms:
        print(room)


def retrievefromdb():
    for dbRoom in dbRooms.find({}, projection={'_id': False, 'name': True, 'state': True}):
        for localRoom in localRooms:
            if localRoom.name == dbRoom.name:
                localRoom.state = dbRoom.state


def writebacktodb():
    for room in localRooms:
        dbRooms.find_one_and_update({'name': room['name']}, {'$set': {'state': room['state']}})


initiatefromdb()


def on_message(client, userdata, message):
    global hotel
    _topic = str(message.topic)
    _data = int(str(message.payload.decode("utf-8")))

    start = "hotel/"
    end = "/relay"
    room = int(_topic[len(start):-len(end)])

    for localRoom in localRooms:
        if localRoom.name == room:
            if _data == 1:
                localRoom.state = True
            else:
                localRoom.state = False


def on_disconnect(client, userdata, rc):
    print("Disconnected")


def on_connect(client, obj, flags, rc):
    print("Connected")
    client.subscribe(subTopic)
    polling_relay()


def polling_relay():
    for floor in range(4):
        for room in range(5):
            room_num = str((floor + 1) * 100 + room + 1)
            client.publish("hotel/" + room_num + "/admin", "RELAY_STAT")


client = mqtt.Client()
client.on_message = on_message
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.connect(broker_address)
print("Connecting...")
client.loop_forever()

while (1):
    time.sleep(2)
    writebacktodb()

while (1):
    time.sleep(2)
    retrievefromdb()