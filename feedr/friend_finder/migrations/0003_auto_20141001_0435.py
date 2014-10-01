# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('friend_finder', '0002_remove_image_standard_resolution'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='low_resolution',
            field=models.URLField(max_length=255, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='thumbnail',
            field=models.URLField(max_length=255, null=True, blank=True),
        ),
    ]
