# Generated by Django 4.1.4 on 2023-01-21 23:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('iron_app', '0007_program_unique_program'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workout',
            name='description',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]