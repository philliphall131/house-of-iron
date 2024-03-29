# Generated by Django 4.1.4 on 2023-02-24 00:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('iron_app', '0021_workout_unique_workout_number'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='section',
            constraint=models.UniqueConstraint(fields=('workout', 'number'), name='unique_section_number'),
        ),
    ]
