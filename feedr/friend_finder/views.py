from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import facebook
import json
import datetime
import time
# from instagram.client import InstagramAPI

# Create your views here.


def home(request):
    return render(request, 'home.html')


def instagram(request):
    # The other way of doing it:
    # user_social_auth = request.user.social_auth.filter(provider='instagram').first()
    # token = user_social_auth.extra_data['access_token']
    return render(request, 'instagram.html')


@login_required
@csrf_exempt
def map(request):
    user_social_auth = request.user.social_auth.filter(provider='facebook').first()
    graph = facebook.GraphAPI(user_social_auth.extra_data['access_token'])
    photos = graph.get_object("me/photos", limit=50)
    return render(request, 'map.html', {'photo_json': json.dumps(photos['data'])})


@csrf_exempt
def return_json(request):
    if request.method == 'POST':
        year = request.POST['year']
        month = request.POST['month']
        offset = int(request.POST['offset'])
        date = datetime.datetime(int(year), int(month), 1)
        seconds = time.mktime(date.timetuple())
        user_social_auth = request.user.social_auth.filter(provider='facebook').first()
        graph = facebook.GraphAPI(user_social_auth.extra_data['access_token'])
        photos = graph.get_object("me/photos", until=seconds, limit=20, offset=offset)
        return HttpResponse(json.dumps(photos['data']), content_type='application/json')


@login_required
def profile(request):
    user_social_auth = request.user.social_auth.filter(provider='facebook').first()
    graph = facebook.GraphAPI(user_social_auth.extra_data['access_token'])
    profile_data = graph.get_object("me")
    picture_data = graph.get_object("me/picture", width=200)
    interests = graph.get_object("me/interests")
    return render(request, 'profile.html', {'profile_data': profile_data,
                                            'picture_data': picture_data,
                                            'interests': interests})
