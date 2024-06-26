from django.shortcuts import render
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from .serializers import UserSerializer,CampeonatoSerializer,CategoriaSerializer,CompetidorSerializer,SansionSerializer,DojoSerializer,DetalleCategoriaCompetidorSerializer,DetalleCampeonatoCategoriaSerializer,DetalleCampeonatoCategoriaCompetidorSerializer,CompetidoresPorCategoriaSerializer
#para el status
from rest_framework import status
#para las acciones
from rest_framework.decorators import action


from .models import Usuario,Campeonato,Categoria,Competidor,Sancion,Dojo,Detallecategoriacompetidor,Detallecampeonatocategoria,Detallecampeonatocategoriacompetidor



from rest_framework.permissions import IsAuthenticated,IsAdminUser
# Create your views here.
################
from rest_framework import viewsets

#agregado por mi como extra 

from rest_framework_simplejwt.tokens import RefreshToken
#########
# Create your views here.
from rest_framework.parsers import MultiPartParser, FormParser
#para la consulta avanzada
from django.db.models import Count

#crud crear 
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.exclude(rol='administrador')
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

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
    queryset = Detallecategoriacompetidor.objects.all()
    serializer_class = DetalleCategoriaCompetidorSerializer
  
class DetalleCampeonatoCategoriaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,IsAdminUser]
    queryset = Detallecampeonatocategoria.objects.all()
    serializer_class = DetalleCampeonatoCategoriaSerializer
    
class DetalleCampeonatoCategoriaCompetidorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,IsAdminUser]
    queryset = Detallecampeonatocategoriacompetidor.objects.all()
    serializer_class = DetalleCampeonatoCategoriaCompetidorSerializer
      
    
#para mi consulta avanzada 
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def competidores_por_categoria(request):
    campeonato_nombre = request.data.get('campeonato_nombre')
    campeonato_fecha = request.data.get('campeonato_fecha')

    if not campeonato_nombre or not campeonato_fecha:
        return Response({'error': 'campeonato_nombre y campeonato_fecha son requeridos'}, status=400)

    query = Detallecampeonatocategoriacompetidor.objects.values(
        'categoria_campeonato__categoria__nombre',
        'categoria_campeonato__categoria__modalidad'
    ).annotate(
        cantidad_competidores=Count('competidor_id')
    ).filter(
        categoria_campeonato__campeonato__nombre=campeonato_nombre,
        categoria_campeonato__campeonato__fecha=campeonato_fecha
    ).order_by('-cantidad_competidores')

    results = [
        {
            'categoria_nombre': item['categoria_campeonato__categoria__nombre'],
            'categoria_modalidad': item['categoria_campeonato__categoria__modalidad'],
            'cantidad_competidores': item['cantidad_competidores']
        }
        for item in query
    ]

    serializer = CompetidoresPorCategoriaSerializer(results, many=True)
    return Response(serializer.data)