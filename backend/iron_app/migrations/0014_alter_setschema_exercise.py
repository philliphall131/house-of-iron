# Generated by Django 4.1.4 on 2023-02-20 01:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('iron_app', '0013_setschema_delete_exerciseschema'),
    ]

    operations = [
        migrations.AlterField(
            model_name='setschema',
            name='exercise',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='set_schema', to='iron_app.exercise'),
        ),
    ]
