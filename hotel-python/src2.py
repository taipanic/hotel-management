import pymongo

dbClient = pymongo.MongoClient(
   "mongodb+srv://minhtaile2712:imissyou@cluster0-wyhfl.mongodb.net/test?retryWrites=true&w=majority")
db = dbClient.test
dbRooms = db.rooms
localRooms = []

def initiatefromdb():
   for room in dbRooms.find({}, projection={'_id': False, 'name': True, 'state': True}):
      localRooms.append(room)

def writebacktodb():
   for room in localRooms:
      dbRooms.find_one_and_update({'name': room['name']}, {'$set': {'state': room['state']}})

initiatefromdb()
for room in localRooms:
   print(room)

localRooms[1]['state'] = False
writebacktodb()

while (1):
  # time.sleep(2)
  writebacktodb()


def retrievefromdb():
   for dbRoom in dbRooms.find({}, projection={'_id': False, 'name': True, 'state': True}):
      for localRoom in localRooms:
         if localRoom.name == dbRoom.name:
            localRoom.state = dbRoom.state

while (1):
   # time.sleep(2)
   retrievefromdb()

# floors = db.floors
# for floor in floors.find({},{'name'}):
#    print(floor)

# collection = db.rooms
# import datetime
# new_tank = {"author": "Le",
#             "name": "T12",
#             "killed": ["d", "e", "f"],
#             "buy_date": datetime.datetime.utcnow()}
# tanks = db.tanks
# tank_id = tanks.insert_one(new_tank).inserted_id
# print(tank_id)
