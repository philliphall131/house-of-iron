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

class ProgramViewSet(ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

    def create(self, request, *args, **kwargs):
        # customized: adding in the logged in user as the author
        request.data['author'] = request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        #customized: after saving the model, using its Id as the base program ID for later copies
        new_program = Program.objects.get(id=serializer.instance.id)
        new_program.base_program_id = new_program.id
        new_program.save(update_fields=['base_program_id'])

        #customized: after creating/saving the model, create the related program days to get started
        #these can be added to/removed later in the process
        for i in range(new_program.duration_wks*7):
            ProgramDay.objects.create(program=new_program, day=i+1, day_type='None')

        #return the final instance
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=False)
    def authored(self, request):
        authored_programs = Program.objects.filter(author=request.user.id)
        serializer = self.get_serializer(authored_programs, many=True)
        return Response(serializer.data)

class ProgramDayViewSet(ModelViewSet):
    queryset = ProgramDay.objects.order_by('day')
    serializer_class = ProgramDaySerializer

class WorkoutViewSet(ModelViewSet):
    queryset = Workout.objects.order_by('number')
    serializer_class = WorkoutSerializer

    def create(self, request, *args, **kwargs):
        day = ProgramDay.objects.get(id = request.data['program_day'])
        others = Workout.objects.filter(program_day = request.data['program_day'])
        name = f'{day.program.name}-{day.day}.{len(others)+1}'
        request.data['name'] = name
        return super().create(request, *args, **kwargs)

class SectionViewSet(ModelViewSet):
    queryset = Section.objects.order_by('number')
    serializer_class = SectionSerializer

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

class ExerciseBaseViewSet(ModelViewSet):
    queryset = ExerciseBase.objects.all()
    serializer_class = ExerciseBaseSerializer

    @action(detail=False, methods=['post'])
    def check(self, request):
        try:
            exercise_check = ExerciseBase.objects.filter(name = request.data)
            if len(exercise_check) == 0:
                # return false if exercise does not exist
                return Response({'exercise_exists':False}, status=status.HTTP_200_OK)
            # return true if exercise does exist
            return Response({'user_exists':True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ExerciseViewSet(ModelViewSet):
    queryset = Exercise.objects.order_by('number')
    serializer_class = ExerciseSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        #after creating the exercise, create its set schema and associate the two
        new_exercise = Exercise.objects.get(id=serializer.instance.id)
        SetSchema.objects.create(exercise=new_exercise)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class SetViewSet(ModelViewSet):
    queryset = Set.objects.order_by('number')
    serializer_class = SetSerializer

class SetSchemaViewSet(ModelViewSet):
    queryset = Set.objects.all()
    serializer_class = SetSchemaSerializer