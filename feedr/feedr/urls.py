from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'friend_finder.views.home', name='home'),
    url(r'^profile/$', 'friend_finder.views.profile', name='profile'),
    url(r'^map/$', 'friend_finder.views.map', name='map'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', name='logout'),

    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^admin/', include(admin.site.urls)),
)
