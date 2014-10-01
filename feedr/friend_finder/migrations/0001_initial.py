# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('link', models.URLField(max_length=255)),
                ('thumbnail', models.ImageField(max_length=255, null=True, upload_to=b'thumbnail', blank=True)),
                ('low_resolution', models.ImageField(max_length=255, null=True, upload_to=b'low_resolution', blank=True)),
                ('standard_resolution', models.ImageField(max_length=255, null=True, upload_to=b'standard_resolution', blank=True)),
                ('latitude', models.IntegerField()),
                ('longitude', models.IntegerField()),
                ('user', models.ManyToManyField(related_name=b'image', null=True, to=settings.AUTH_USER_MODEL, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Map',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('image', models.ManyToManyField(related_name=b'map', null=True, to='friend_finder.Image', blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
