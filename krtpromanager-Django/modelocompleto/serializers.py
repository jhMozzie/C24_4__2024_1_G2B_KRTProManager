from rest_framework import serializers
from .models import Campeonato, Categoria, Detallecategoriacompetidor, Competidor, Sancion, Usuario,Dojo,Detallecampeonatocategoria,Detallecampeonatocategoriacompetidor


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'nombres', 'apellidos', 'email', 'password', 'rol']
        extra_kwargs = {
            'password': {'write_only': True},
            'rol': {'required': False, 'default': 'academia'}  # Haciendo que 'rol' sea opcional y estableciendo un valor por defecto
        }

    def create(self, validated_data):
        user = Usuario(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
            validated_data['password'] = instance.password
        return super().update(instance, validated_data)
        
class CampeonatoSerializer(serializers.ModelSerializer):
    
    dojo_nombre = serializers.ReadOnlyField(source='dojo.nombreDojo')
    
    class Meta:
        model = Campeonato
        fields = '__all__'

class DojoSerializer(serializers.ModelSerializer):
    
    usuario_nombre = serializers.ReadOnlyField(source='usuario.nombres')
    
    class Meta:
        model = Dojo
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'
        

class CompetidorSerializer(serializers.ModelSerializer):
    #aca solo lo hago para poder hacer que en la vista poder ver los nombres
    dojo_nombre = serializers.ReadOnlyField(source='dojo.nombredojo')

    class Meta:
        model = Competidor
        fields = '__all__'
        

class SansionSerializer(serializers.ModelSerializer):
    Competidor_nombre = serializers.ReadOnlyField(source='detallecampeonatocategoriacompetidor_id.competidor.nombre')
    Competidor_apellido = serializers.ReadOnlyField(source='detallecampeonatocategoriacompetidor_id.competidor.apellido')
    Competidor_dojo_nombre = serializers.ReadOnlyField(source='detallecampeonatocategoriacompetidor_id.competidor.dojo.nombreDojo')
    
    class Meta:
        model = Sancion
        fields = '__all__'

class DetalleCategoriaCompetidorSerializer(serializers.ModelSerializer):
    Competidor_nombre = serializers.ReadOnlyField(source='competidor.nombre')
    Competidor_apellido = serializers.ReadOnlyField(source='competidor.apellido')
    Competidor_dojo_nombre = serializers.ReadOnlyField(source='competidor.dojo.nombreDojo')
    Categoria_nombre = serializers.ReadOnlyField(source='categoria.nombre')
    Categoria_genero = serializers.ReadOnlyField(source='categoria.genero')
    Categoria_modelidad = serializers.ReadOnlyField(source='categoria.modalidad')
    Categoria_grado = serializers.ReadOnlyField(source='categoria.grado')
        
    class Meta:
        model = Detallecategoriacompetidor
        fields = '__all__'

class DetalleCampeonatoCategoriaSerializer(serializers.ModelSerializer):
    Campeonato_nombre = serializers.ReadOnlyField(source='campeonato.nombre')
    Campeonato_fecha = serializers.ReadOnlyField(source='campeonato.fecha')
    Campeonato_local = serializers.ReadOnlyField(source='campeonato.local')
    Categoria_nombre = serializers.ReadOnlyField(source='categoria.nombre')
    Categoria_genero = serializers.ReadOnlyField(source='categoria.genero')
    Categoria_modelidad = serializers.ReadOnlyField(source='categoria.modalidad')
    Categoria_grado = serializers.ReadOnlyField(source='categoria.grado')

    class Meta:
        model = Detallecampeonatocategoria
        fields = '__all__'

class DetalleCampeonatoCategoriaCompetidorSerializer(serializers.ModelSerializer):
    Categoria_nombre = serializers.ReadOnlyField(source='categoria_campeonato.categoria.nombre')
    Categoria_genero = serializers.ReadOnlyField(source='categoria_campeonato.categoria.genero')
    Categoria_modelidad = serializers.ReadOnlyField(source='categoria_campeonato.categoria.modalidad')
    Categoria_grado = serializers.ReadOnlyField(source='categoria_campeonato.categoria.grado')
    Campeonato_nombre = serializers.ReadOnlyField(source='categoria_campeonato.campeonato.nombre')
    Campeonato_fecha = serializers.ReadOnlyField(source='categoria_campeonato.campeonato.fecha')
    Competidor_nombre = serializers.ReadOnlyField(source='competidor.nombre')
    Competidor_apellido = serializers.ReadOnlyField(source='competidor.apellido')
    Competidor_dojo_nombre = serializers.ReadOnlyField(source='competidor.dojo.nombreDojo')
    
    class Meta:
        model = Detallecampeonatocategoriacompetidor
        fields = '__all__'
        
class CompetidoresPorCategoriaSerializer(serializers.Serializer):
    categoria_nombre = serializers.CharField(max_length=100)
    categoria_modalidad = serializers.CharField(max_length=100)
    cantidad_competidores = serializers.IntegerField()