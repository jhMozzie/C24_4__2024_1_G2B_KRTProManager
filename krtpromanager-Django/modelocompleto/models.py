# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.utils.translation import gettext_lazy as _
import bcrypt


class Campeonato(models.Model):
    id = models.BigAutoField(primary_key=True)
    distrito = models.CharField(max_length=255, blank=True, null=True)
    fecha = models.DateTimeField(blank=True, null=True)
    imagen = models.ImageField(upload_to='', blank=True, null=True)  # New field for the image
    local = models.CharField(max_length=255, blank=True, null=True)
    nombre = models.CharField(max_length=255, blank=True, null=True)
    provincia = models.CharField(max_length=255, blank=True, null=True)
    url_bases = models.FileField(upload_to='', blank=True, null=True)#cambiado por mi 
    dojo = models.ForeignKey('Dojo', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'campeonato'


class Categoria(models.Model):
    id = models.BigAutoField(primary_key=True)
    nombre = models.CharField(max_length=255, blank=True, null=True)
    descripcion = models.CharField(max_length=255, blank=True, null=True)
    genero = models.CharField(max_length=255, blank=True, null=True)
    grado = models.CharField(max_length=255, blank=True, null=True)
    modalidad = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'categoria'


class Competidor(models.Model):
    id = models.BigAutoField(primary_key=True)
    apellido = models.CharField(max_length=255, blank=True, null=True)
    edad = models.IntegerField()
    genero = models.CharField(max_length=255, blank=True, null=True)
    nombre = models.CharField(max_length=255, blank=True, null=True)
    dojo = models.ForeignKey('Dojo', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'competidor'


class Detallecampeonatocategoria(models.Model):
    id = models.BigAutoField(primary_key=True)
    campeonato = models.ForeignKey(Campeonato, models.DO_NOTHING, blank=True, null=True)
    categoria = models.ForeignKey(Categoria, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'detallecampeonatocategoria'


class Detallecampeonatocategoriacompetidor(models.Model):
    id = models.BigAutoField(primary_key=True)
    competidor = models.ForeignKey(Competidor, models.DO_NOTHING, blank=True, null=True)
    categoria_campeonato = models.ForeignKey(Detallecampeonatocategoria, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'detallecampeonatocategoriacompetidor'


class Dojo(models.Model):
    id = models.BigAutoField(primary_key=True)
    nombredojo = models.CharField(db_column='nombreDojo', max_length=255)  # Field name made lowercase.
    senseidojo = models.CharField(db_column='senseiDojo', max_length=255)  # Field name made lowercase.
    usuario = models.OneToOneField('Usuario', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dojo'


class Sancion(models.Model):
    id = models.BigAutoField(primary_key=True)
    motivo = models.CharField(max_length=255, blank=True, null=True)
    detallecampeonatocategoriacompetidor = models.ForeignKey(Detallecampeonatocategoriacompetidor, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sancion'


class Usuario(models.Model):
    id = models.BigAutoField(primary_key=True)
    apellidos = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    nombres = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    rol = models.CharField(max_length=255)
    username = models.CharField(unique=True, max_length=255)

    class Meta:
        managed = False
        db_table = 'usuario'
        
    def set_password(self, raw_password):
        """
        Hash the password using bcrypt and save it.
        """
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), salt)
        self.password = hashed_password.decode('utf-8')
    
    def check_password(self, raw_password):
        """
        Check if the provided password matches the hashed password stored.
        """
        return bcrypt.checkpw(raw_password.encode('utf-8'), self.password.encode('utf-8'))

    def save(self, *args, **kwargs):
        """
        Override the save method to hash the password if it's not hashed yet.
        """
        if not self.password.startswith('$2b$'):
            self.set_password(self.password)
        super(Usuario, self).save(*args, **kwargs)
    
class Detallecategoriacompetidor(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    competidor = models.ForeignKey(Competidor, on_delete=models.CASCADE) 

    class Meta:
        db_table = 'detallecategoriacompetidor'
        unique_together = ('categoria', 'competidor')
        
    def __str__(self):
        return f"{self.categoria} - {self.competidor}"