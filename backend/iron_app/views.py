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
from time import sleep

class IronModelViewSet(ModelViewSet):
    @action(detail=True, methods=['post'])
    def create_or_update(self, request, pk=None, *args, **kwargs):
        try:
            if int(pk) >= 0:
                return super().partial_update(request, *args, **kwargs)
            else:
                return self.create(request, *args, **kwargs)
            
        except Exception as e:
            return Response({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)  

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

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'destroy', 'partial_update', 'list']:
            return ProgramFlatSerializer
        else:
            return ProgramDeepSerializer

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
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'destroy', 'partial_update', 'list']:
            return ProgramDayFlatSerializer
        else:
            return ProgramDayDeepSerializer

class WorkoutViewSet(ModelViewSet):
    queryset = Workout.objects.order_by('number')

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'destroy', 'partial_update', 'list']:
            return WorkoutFlatSerializer
        else:
            return WorkoutDeepSerializer

    def create(self, request, *args, **kwargs):
        day = ProgramDay.objects.get(id = request.data['program_day'])
        others = Workout.objects.filter(program_day = request.data['program_day'])
        name = f'{day.program.name}-{day.day}.{len(others)+1}'
        request.data['name'] = name
        return super().create(request, *args, **kwargs)

class SectionViewSet(IronModelViewSet):
    queryset = Section.objects.order_by('number')

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'destroy', 'partial_update', 'list', 'create_or_update', 'full_section_update']:
            return SectionFlatSerializer
        else:
            return SectionDeepSerializer
        
    @action(detail=True, methods=['post'])
    def full_section_update(self, request, pk=None, *args, **kwargs):
        try:
            # first update the section itself
            section_obj = None
            if int(pk) >= 0:
                partial = True
                instance = self.get_object()
                section_obj = instance
                serializer = self.get_serializer(instance, data=request.data, partial=partial)
                serializer.is_valid(raise_exception=True)
                self.perform_update(serializer)

                if getattr(instance, '_prefetched_objects_cache', None):
                    # If 'prefetch_related' has been applied to a queryset, we need to
                    # forcibly invalidate the prefetch cache on the instance.
                    instance._prefetched_objects_cache = {}
            else:
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                section_obj = serializer.instance
            
            # then iterate through the exercises and update each
            for exercise in request.data['exercises']:
                # first update the exercise base
                base, _ = ExerciseBase.objects.get_or_create(name=exercise['exercise_base']['label'])
                # then update the exercise itself
                exercise_obj = None
                set_schema = None
                if exercise['id'] == -1:
                    exercise_obj = Exercise.objects.create(
                        exercise_base = base,
                        section= section_obj,
                        number = exercise['number']
                    )
                else:
                    exercise_obj = Exercise.objects.get(id=exercise['id'])
                    exercise_obj.exercise_base = base
                    exercise_obj.number = exercise['number']
                    exercise_obj.section = section_obj
                    exercise_obj.save()
                
                # then update the exercises set schema
                set_schema, _ = SetSchema.objects.get_or_create(exercise=exercise_obj)
                set_schema.is_distance = exercise['set_schema']['is_distance']
                set_schema.is_reps = exercise['set_schema']['is_reps']
                set_schema.is_weight = exercise['set_schema']['is_weight']
                set_schema.is_time = exercise['set_schema']['is_time']
                set_schema.save()

                # finally iterate over and update each set
                for set in exercise['sets']:
                    if set['id'] == -1:
                        Set.objects.create(
                            exercise = exercise_obj,
                            number = set['number'],
                            planned_reps = int(set['planned_reps']) if set['planned_reps'] != "" else None,
                            planned_weight = int(set['planned_weight']) if set['planned_weight'] != "" else None,
                            planned_distance = float(set['planned_distance']) if set['planned_distance'] != "" else None,
                            planned_time_secs = int(set['planned_time_secs']) if set['planned_time_secs'] != "" else None
                        )
                    else:
                        set_obj = Set.objects.get(id=set['id'])
                        exercise = exercise_obj
                        set_obj.number = set['number']
                        set_obj.planned_reps = int(set['planned_reps']) if set['planned_reps'] != "" else None
                        set_obj.planned_weight = int(set['planned_weight']) if set['planned_weight'] != "" else None
                        set_obj.planned_distance = float(set['planned_distance']) if set['planned_distance'] != "" else None
                        set_obj.planned_time_secs = int(set['planned_time_secs']) if set['planned_time_secs'] != "" else None
                        set_obj.save()

           
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            
        except Exception as e:
            return Response({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)  

class ExerciseBaseViewSet(IronModelViewSet):
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

class ExerciseViewSet(IronModelViewSet):
    queryset = Exercise.objects.order_by('number')

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'destroy', 'partial_update', 'create_or_update', 'list']:
            return ExerciseFlatSerializer
        else:
            return ExerciseDeepSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        #after creating the exercise, create its set schema and associate the two
        new_exercise = Exercise.objects.get(id=serializer.instance.id)
        SetSchema.objects.create(exercise=new_exercise)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)   

class SetViewSet(IronModelViewSet):
    queryset = Set.objects.order_by('number')
    serializer_class = SetSerializer  

class SetSchemaViewSet(ModelViewSet):
    queryset = SetSchema.objects.all()
    serializer_class = SetSchemaSerializer