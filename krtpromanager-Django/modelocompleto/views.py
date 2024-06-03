from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer,CampeonatoSerializer,CategoriaSerializer,CompetidorSerializer,SansionSerializer,DojoSerializer
#para el status
from rest_framework import status


from .models import Usuario,Campeonato,Categoria,Competidor,Sancion,Dojo



from rest_framework.permissions import IsAuthenticated,IsAdminUser
# Create your views here.
################
from rest_framework import viewsets

#agregado por mi como extra 

from rest_framework_simplejwt.tokens import RefreshToken
#########
# Create your views here.

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
    permission_classes = [IsAuthenticated,IsAdminUser]
    queryset = Campeonato.objects.all()
    serializer_class = CampeonatoSerializer

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

