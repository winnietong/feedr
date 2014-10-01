# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('friend_finder', '0003_auto_20141001_0435'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='link',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='image',
            name='low_resolution',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='thumbnail',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
    ]
