from django.contrib.auth.decorators import login_required
from django.shortcuts import render
import facebook
import json
from instagram.client import InstagramAPI

# Create your views here.


def home(request):
    return render(request, 'home.html')


def instagram(request):
    return render(request, 'instagram.html')


@login_required
def map(request):
    user_social_auth = request.user.social_auth.filter(provider='facebook').first()
    graph = facebook.GraphAPI(user_social_auth.extra_data['access_token'])
    photos = graph.get_object("me/photos", limit=50)
    return render(request, 'map.html', {'photo_json': json.dumps(photos['data'])})


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

def ajaxmap(request):
    return render(request, 'ajaxmap.html')