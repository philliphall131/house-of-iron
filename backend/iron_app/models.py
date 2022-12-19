from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=50, null=True, blank=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(verbose_name='email address',max_length=255,unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', "username"] 

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

# class Program(models.Model):
#     # On creating a new program, the program creates the number of workouts per the duration specified
#     name = models.CharField(max_length=255)
#     description = models.TextField(null=True, blank=True)
#     duration = models.IntegerField()

# class Workout(models.Model):
#     # TODO : Need to workout some way to track the history of the workout
#     # which would involve seeing past dates of this workout being completed and 
#     # weights/reps/times completed
#     day = models.IntegerField()
#     type = models.CharField(max_length=255, null=True, blank=True)
#     program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='workouts')
