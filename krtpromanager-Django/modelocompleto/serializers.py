from rest_framework import serializers
from .models import Campeonato, Categoria, DetalleCategoriaCompetidor, Competidor, Sancion, Usuario,Dojo,DetalleCampeonatoCategoria,DetalleCampeonatoCategoriaCompetidor
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'nombres', 'apellidos', 'email', 'password', 'rol']
        extra_kwargs = {
            'password': {'write_only': True},
            'rol': {'required': False, 'default': 'academia'}  # Haciendo que 'rol' sea opcional y estableciendo un valor por defecto
        } 


    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))  # Encriptar la contraseña
        user = Usuario.objects.create(**validated_data)
        return user

        
class CampeonatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campeonato
        fields = '__all__'

class DojoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dojo
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'
        

class CompetidorSerializer(serializers.ModelSerializer):
    #aca solo lo hago para poder hacer que en la vista poder ver los nombres
    dojo_nombre = serializers.ReadOnlyField(source='dojo.nombreDojo')

    class Meta:
        model = Competidor
        fields = '__all__'
        

class SansionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sancion
        fields = '__all__'

class DetalleCategoriaCompetidorSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleCategoriaCompetidor
        fields = '__all__'

class DetalleCampeonatoCategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleCampeonatoCategoria
        fields = '__all__'

class DetalleCampeonatoCategoriaCompetidorSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleCampeonatoCategoriaCompetidor
        fields = '__all__'
        
