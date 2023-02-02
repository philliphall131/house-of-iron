from django.db import models
from django.core.validators import MinValueValidator
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

class Program(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='authored_programs')
    description = models.TextField(null=True, blank=True)
    duration_wks = models.IntegerField()
    base_program_id = models.IntegerField(blank=True, null=True)
    athlete = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name='programs')
    active = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name','author'], name='unique_program'),
        ]

    def __str__(self):
        return f'{self.name}'

class ProgramDay(models.Model):
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name="program_days")
    day = models.IntegerField(validators=[MinValueValidator(1)])
    day_type = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['program','day'], name='unique_program_day'),
        ]
    
    def __str__(self):
        return f'{self.program.name} Day {self.day}'

class Workout(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    program_day = models.ForeignKey(ProgramDay, on_delete=models.CASCADE, related_name="workouts")
    description = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f'{self.name}' if self.name else f'Workout Object ({self.pk})'

class Section(models.Model):
    section_type = models.CharField(max_length=255)
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE, related_name='sections')

    def __str__(self):
        return f'{self.section_type}/{self.workout.name}'

class ExerciseBase(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.CharField(max_length=255)
    # type = models.CharField(max_length=255)
    # target body part

    def __str__(self):
        return f'{self.name}'

class Exercise(models.Model):
    exercise_base = models.ForeignKey(ExerciseBase, on_delete=models.CASCADE, related_name='exercises')
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='exercises')

    def __str__(self):
        return f'{self.exercise_base.name} in {self.section.workout.name}/{self.section.section_type}'

class Set(models.Model):
    number = models.IntegerField(validators=[MinValueValidator(1)])
    planned_reps = models.CharField(max_length=255, null=True, blank=True)
    reps = models.CharField(max_length=255, null=True, blank=True)
    planned_weight = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    weight = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    planned_distance = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    distance = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    planned_time_secs = models.IntegerField(null=True, blank=True)
    time_secs = models.IntegerField(null=True, blank=True)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, related_name='sets')

    def __str__(self):
        return f'Set {self.number} in {self.exercise_base.name}/{self.section.workout.name}/{self.section.section_type}'
