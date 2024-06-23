from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer,CampeonatoSerializer,CategoriaSerializer,CompetidorSerializer,SansionSerializer,DojoSerializer,DetalleCategoriaCompetidorSerializer,DetalleCampeonatoCategoriaSerializer,DetalleCampeonatoCategoriaCompetidorSerializer
#para el status
from rest_framework import status
#para las acciones
from rest_framework.decorators import action


from .models import Usuario,Campeonato,Categoria,Competidor,Sancion,Dojo,DetalleCategoriaCompetidor,DetalleCampeonatoCategoria,DetalleCampeonatoCategoriaCompetidor



from rest_framework.permissions import IsAuthenticated,IsAdminUser
# Create your views here.
################
from rest_framework import viewsets

#agregado por mi como extra 

from rest_framework_simplejwt.tokens import RefreshToken
#########
# Create your views here.
from rest_framework.parsers import MultiPartParser, FormParser

#crud crear 
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.exclude(rol='administrador')
    serializer_class = UserSerializer

    @action(detail=True, methods=['post'])
    def set_password(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({'status': 'password set'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        """
        List all users but do not include the password in the response.
        """
        response = super().list(request, *args, **kwargs)
        for user in response.data:
            user['password'] = '********'  # Mask the password in the response
        return response

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a user but do not include the password in the response.
        """
        response = super().retrieve(request, *args, **kwargs)
        response.data['password'] = '********'  # Mask the password in the response
        return response

##añadiendo el crear 
@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        # Guardar el usuario
        user = serializer.save()

        # Encriptar la contraseña (esto ya se hace en el serializer, por lo que no es necesario hacerlo aquí nuevamente)
        # user.set_password(request.data.get('password'))
        # user.save()

        # Crear el token de acceso y el token de actualización
        refresh = RefreshToken.for_user(user)

        # Devolver la respuesta con el token de acceso, el token de actualización y los datos del usuario serializados
        return Response({
            'token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'user': serializer.data
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = Usuario.objects.filter(username=username).first()

    if user and user.check_password(password):
        # Crear el token de acceso y el token de actualización
        refresh = RefreshToken.for_user(user)

        # Devolver la respuesta con el token de acceso, el token de actualización y los datos del usuario serializados
        return Response({
            'token': str(refresh.access_token),
            'refresh_token': str(refresh),
        #si quiero que no se mande los datos de usuario por aca lo elimino    
            'user': UserSerializer(user).data
        })

    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


##echo por mi el crud 
class DojoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,IsAdminUser]
    queryset = Dojo.objects.all()
    serializer_class = DojoSerializer

class CampeonatoViewSet(viewsets.ModelViewSet):
    queryset = Campeonato.objects.all()
    serializer_class = CampeonatoSerializer
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        print(self.request.data)  # Debug: Print received data
        serializer.save()

    def perform_update(self, serializer):
        print(self.request.data)  # Debug: Print received data
        serializer.save()


class CategoriaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,IsAdminUser]
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class CompetidorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,IsAdminUser]
    queryset = Competidor.objects.all()
    serializer_class = CompetidorSerializer

class SancionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,IsAdminUser]
    queryset = Sancion.objects.all()
    serializer_class = SansionSerializer

class DetalleCategoriaCompetidorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,IsAdminUser]
    queryset = DetalleCategoriaCompetidor.objects.all()
    serializer_class = DetalleCategoriaCompetidorSerializer
  
class DetalleCampeonatoCategoriaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,IsAdminUser]
    queryset = DetalleCampeonatoCategoria.objects.all()
    serializer_class = DetalleCampeonatoCategoriaSerializer
    
class DetalleCampeonatoCategoriaCompetidorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,IsAdminUser]
    queryset = DetalleCampeonatoCategoriaCompetidor.objects.all()
    serializer_class = DetalleCampeonatoCategoriaCompetidorSerializer
      
    