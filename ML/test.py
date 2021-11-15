# import spotipy
# from spotipy.oauth2 import SpotifyOAuth
# import cred

# scope = "user-read-recently-played"

# sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=cred.client_ID, client_secret= cred.client_SECRET, redirect_uri=cred.redirect_url, scope=scope))

# results = sp.current_user_recently_played()
# for idx, item in enumerate(results['items']):
#     track = item['track']
#     print(idx, track['artists'][0]['name'], " – ", track['name'])


# import spotipy
# from spotipy.oauth2 import SpotifyClientCredentials
# import os

# os.environ["SPOTIPY_CLIENT_ID"]='2dc1d1cc4a344030a74de9fa03c8f4a8'
# os.environ["SPOTIPY_CLIENT_SECRET"]='86f81ff134f5491185034228dcf50c1e'   

# birdy_uri = 'spotify:artist:2WX2uTcsvV5OnS0inACecP'
# spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())

# results = spotify.artist_albums(birdy_uri, album_type='album')
# albums = results['items']
# while results['next']:
#     results = spotify.next(results)
#     albums.extend(results['items'])

# for album in albums:
#     print(album['name'])

# mongodb+srv://MuseMatch:musematch123@cluster0.6ip8o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


from pymongo import MongoClient
# connect to MongoDB
url = "mongodb+srv://MuseMatch:musematch123@cluster0.6ip8o.mongodb.net/beta?retryWrites=true&w=majority"
client = MongoClient(url)
print("client: \n", client)
db=client[beta]
print("database:\n", db)
filter = {"name": {"$regex": r"^(?!system\.)"}}
return db.list_collection_names(filter=filter)

# try: db.command("serverStatus")
# except Exception as e: print(e)
# else: print("You are connected!")
# client.close()

