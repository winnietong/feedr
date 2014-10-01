from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Image(models.Model):
    link = models.CharField(max_length=255)
    user = models.ManyToManyField(User, blank=True, null=True, related_name='image')
    thumbnail = models.TextField(max_length=255, blank=True, null=True)
    low_resolution = models.TextField(max_length=255, blank=True, null=True)
    latitude = models.CharField(max_length=40)
    longitude = models.CharField(max_length=40)

    def __unicode__(self):
        return unicode(self.link)


class Map(models.Model):
    image = models.ManyToManyField(Image, blank=True, null=True, related_name='map')