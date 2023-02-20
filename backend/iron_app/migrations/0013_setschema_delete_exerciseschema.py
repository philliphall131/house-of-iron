# Generated by Django 4.1.4 on 2023-02-20 00:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('iron_app', '0012_exerciseschema'),
    ]

    operations = [
        migrations.CreateModel(
            name='SetSchema',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_reps', models.BooleanField(default=False)),
                ('is_weight', models.BooleanField(default=False)),
                ('is_distance', models.BooleanField(default=False)),
                ('is_time', models.BooleanField(default=False)),
                ('exercise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='set_schema', to='iron_app.exercise')),
            ],
        ),
        migrations.DeleteModel(
            name='ExerciseSchema',
        ),
    ]
