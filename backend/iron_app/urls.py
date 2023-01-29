from django.urls import path, include
from rest_framework import routers
from .views import *
from knox import views as knox_views
from iron_app.views import LoginView

r = routers.DefaultRouter()
r.register('users', UserViewSet, basename='user')
r.register('programs', ProgramViewSet, basename='program')
r.register('program_days', ProgramDayViewSet, basename='program_day')
r.register('workouts', WorkoutViewSet, basename='workout')
r.register('sections', SectionViewSet, basename='section')
r.register('exercises', ExerciseViewSet, basename='exercise')
r.register('exercise_bases', ExerciseBaseViewSet, basename='exercise_base')
r.register('sets', SetViewSet, basename='set')

urlpatterns = [
    path("", include(r.urls)),
    path('login/', LoginView.as_view(), name='knox_login'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    # path('reset_password/', handle_reset),
]