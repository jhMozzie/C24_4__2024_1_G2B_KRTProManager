from django.urls import path, include
from .views import login,register
#importando para el crud
from rest_framework.routers import DefaultRouter
from .views import CampeonatoViewSet,CompetidorViewSet,CategoriaViewSet,SancionViewSet,DojoViewSet,DetalleCategoriaCompetidorViewSet,DetalleCampeonatoCategoriaViewSet,DetalleCampeonatoCategoriaCompetidorViewSet,UsuarioViewSet,competidores_por_categoria
#rutas para los crud
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'campeonatos', CampeonatoViewSet)
router.register(r'competidores', CompetidorViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'sanciones', SancionViewSet)
router.register(r'dojos', DojoViewSet)
router.register(r'detallecategoriacompetidor', DetalleCategoriaCompetidorViewSet)
router.register(r'detallecampeonatocategoria', DetalleCampeonatoCategoriaViewSet)
router.register(r'detallecampeonatocompetidorCategoria', DetalleCampeonatoCategoriaCompetidorViewSet)


urlpatterns = [
    path('login', login, name='login'),
    path('register', register, name='register'),
    path('competidoresporcategoria', competidores_por_categoria, name='competidoresporcategoria'),
    path('', include(router.urls)),
]
