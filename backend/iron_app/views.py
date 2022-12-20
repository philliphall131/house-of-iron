from rest_framework.viewsets import ModelViewSet
from .serializers import *
from .models import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from knox.views import LoginView as KnoxLoginView
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from .models import User

class LoginView(KnoxLoginView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['check_email', 'create']:
            permission_classes = [AllowAny]
        else: 
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['post'])
    def check_email(self, request):
        try:
            user = User.objects.filter(email = request.data['email'])
            if len(user) == 0:
                # return false if user does not exist
                return Response({'user_exists':'false'}, status=status.HTTP_200_OK)
            # return true if user does exist
            return Response({'user_exists':'true'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)