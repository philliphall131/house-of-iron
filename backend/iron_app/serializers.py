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

class ExerciseBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseBase
        fields = ['id', 'name', 'description']

class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = ['id', 'number', 'planned_reps', 'reps', 'planned_weight', 'weight', 'planned_distance', 'distance', 'planned_time_secs', 'time_secs', 'exercise']

class SetSchemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SetSchema
        fields = ['id', 'exercise', 'is_reps', 'is_weight', 'is_distance', 'is_time']

class ExerciseSerializer(serializers.ModelSerializer):
    sets = SetSerializer(many=True)
    exercise_base = ExerciseBaseSerializer()
    set_schema = SetSchemaSerializer()
    class Meta:
        model = Exercise
        fields = ['id', 'exercise_base', 'number', 'section', 'sets', 'set_schema'] 

class SectionSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True, read_only=True)
    class Meta:
        model = Section
        fields = ['id', 'section_type', 'workout', 'number', 'description', 'exercises']
        read_only_fields = ['exercises']

class WorkoutSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True)
    class Meta:
        model = Workout
        fields = ['id', 'name', 'number', 'description', 'program_day', "sections"]

class ProgramDaySerializer(serializers.ModelSerializer):
    workouts = WorkoutSerializer(many=True)
    class Meta:
        model = ProgramDay
        fields = ['id', 'program', 'day', 'day_type', 'workouts']

class ProgramSerializer(serializers.ModelSerializer):
    program_days = ProgramDaySerializer(many=True)
    class Meta:
        model = Program
        fields = ['id', 'name', 'author', 'description','duration_wks','base_program_id','athlete','active','program_days']

