# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('friend_finder', '0004_auto_20141001_0439'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='latitude',
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name='image',
            name='longitude',
            field=models.CharField(max_length=40),
        ),
    ]
