# Generated by Django 4.1.4 on 2023-01-25 23:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('iron_app', '0008_alter_workout_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('section_type', models.CharField(max_length=255)),
                ('workout', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='iron_app.workout')),
            ],
        ),
    ]