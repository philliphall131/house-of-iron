from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=50, null=True, blank=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(verbose_name='email address',max_length=255,unique=True)
    #TODO: active_program
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', "username"] 

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class ProgramTemplate(models.Model):
    #TODO
    pass

class Program(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='authored_programs')
    description = models.TextField(null=True, blank=True)
    duration_wks = models.IntegerField()

class PastPrograms(models.Model):
    pass
    #todo: program
    #todo: user

class Workout(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    #type = 
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    workout_num = models.IntegerField()
    description = models.CharField(max_length=255)

class Section(models.Model):
    type = models.CharField(max_length=255) #TODO: enum or table
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE, related_name='sections')

class Exercise(models.Model):
    name = models.CharField(max_length=255)
    # type = models.CharField(max_length=255)
    # target body part
    description = models.CharField(max_length=255)

class PlannedExercise(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, related_name='planned_exercises')
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='planned_exercises')

class Set(models.Model):
    reps = models.CharField(max_length=255, null=True, blank=True)
    weight = models.DecimalField(max_digits=6, decimal_places=2)
    distance = models.DecimalField(max_digits=6, decimal_places=2)
    time_secs = models.IntegerField()
    planned_exercise = models.ForeignKey(PlannedExercise, on_delete=models.CASCADE, related_name='sets')
