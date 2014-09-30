from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'feedr.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'friend_finder.views.home', name='home'),
    url(r'^profile/$', 'friend_finder.views.profile', name='profile'),
    url(r'^map/$', 'friend_finder.views.map', name='map'),
    url(r'^return_json/$', 'friend_finder.views.return_json', name='return_json'),
    url(r'^instagram/$', 'friend_finder.views.instagram', name='instagram'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', name='logout'),
    url('', include('social.apps.django_app.urls', namespace='social'))
)
