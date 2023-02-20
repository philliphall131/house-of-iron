# Generated by Django 4.1.4 on 2023-02-20 02:09

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('iron_app', '0015_alter_set_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='set',
            name='number',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(1)]),
        ),
        migrations.AddConstraint(
            model_name='set',
            constraint=models.UniqueConstraint(fields=('exercise', 'number'), name='unique_set_number'),
        ),
    ]