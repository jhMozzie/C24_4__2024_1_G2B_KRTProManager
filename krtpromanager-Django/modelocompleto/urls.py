from django.urls import path, include
from .views import login,register
#importando para el crud
from rest_framework.routers import DefaultRouter
from .views import CampeonatoViewSet,CompetidorViewSet,CategoriaViewSet,SancionViewSet,DojoViewSet
#rutas para los crud
router = DefaultRouter()
router.register(r'campeonatos', CampeonatoViewSet)
router.register(r'competidores', CompetidorViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'sanciones', SancionViewSet)
router.register(r'dojos', DojoViewSet)

urlpatterns = [
    path('login', login, name='login'),
    path('register', register, name='register'),

    path('', include(router.urls)),
]
