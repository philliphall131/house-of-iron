from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password", "first_name", "last_name"]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data["password"])
        return super().update(instance, validated_data)

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'program_day']

class ProgramDaySerializer(serializers.ModelSerializer):
    workouts = WorkoutSerializer(many=True, read_only=True)
    class Meta:
        model = ProgramDay
        fields = ['id', 'program', 'day', 'day_type', 'workouts']
        read_only_fields = ['workouts']

class ProgramSerializer(serializers.ModelSerializer):
    program_days = ProgramDaySerializer(many=True, read_only=True)
    class Meta:
        model = Program
        fields = ['id', 'name', 'author', 'description','duration_wks','base_program_id','athlete','active','program_days']
        read_only_fields = ['program_days']

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'program_day']

