from django.urls import path, include
from rest_framework import routers
from .views import *
from knox import views as knox_views
from iron_app.views import LoginView

r = routers.DefaultRouter()
r.register('users', UserViewSet, basename='user')

urlpatterns = [
    path("", include(r.urls)),
    path('login/', LoginView.as_view(), name='knox_login'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    # path('reset_password/', handle_reset),
]