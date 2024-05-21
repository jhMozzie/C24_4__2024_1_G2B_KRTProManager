from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class UsuarioManager(BaseUserManager):
    def create_user(self, username, nombres, apellidos, email, rol='academia', password=None):
        if not email:
            raise ValueError('El usuario debe tener un correo electrónico')
        if not username:
            raise ValueError('El usuario debe tener un nombre de usuario')
        
        email = self.normalize_email(email)
        usuario = self.model(
            username=username,
            nombres=nombres,
            apellidos=apellidos,
            email=email,
            rol=rol
        )
        usuario.set_password(password)
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, username, nombres, apellidos, email, password):
        usuario = self.create_user(
            username=username,
            nombres=nombres,
            apellidos=apellidos,
            email=email,
            password=password,
            rol='administrador'
        )
        usuario.usuario_administrador = True
        usuario.save(using=self._db)
        return usuario

class Usuario(AbstractBaseUser):
    class Rol(models.TextChoices):
        ADMINISTRADOR = 'administrador', _('Administrador')
        ACADEMIA = 'academia', _('Academia')
        ARBITRO = 'arbitro', _('Arbitro')

    username = models.CharField("Nombre para el loginnnnnn", unique=True, max_length=100)
    nombres = models.CharField("Nombres", max_length=200, blank=True, null=True)
    apellidos = models.CharField("Apellidos", max_length=200, blank=True, null=True)
    email = models.EmailField("Email", max_length=255, unique=True , blank=True, null=True)
    rol = models.CharField(max_length=20, choices=Rol.choices, default=Rol.ACADEMIA)
    usuario_activo = models.BooleanField(default=True)
    usuario_administrador = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['nombres', 'apellidos', 'email']

    def __str__(self):
        return f"{self.username} ({self.rol})"

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.usuario_administrador

#relacion de uno(Usuario) a muchos con Dojo 
class Dojo(models.Model):
    nombreDojo = models.CharField(max_length=150,blank=True, null=True)
    senseiDojo = models.CharField(max_length=120,blank=True, null=True)
    Usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

#relacion de uno(Dojo) a muchos con Campeonato 
class Campeonato(models.Model):
    nombre = models.CharField(max_length=100,blank=True, null=True)
    fecha = models.DateField()
    local = models.CharField(max_length=100,blank=True, null=True)
    provincia = models.CharField(max_length=100,blank=True, null=True)
    distrito = models.CharField(max_length=100,blank=True, null=True)
    url_bases = models.FileField(upload_to='campeonatos/', blank=True, null=True)
    dojo = models.ForeignKey(Dojo, on_delete=models.CASCADE , blank=True, null=True)

    def __str__(self):
        return self.nombre
    

        
class Categoria(models.Model):
    NOMENCLATURA_CHOICES = (
        ('A41', 'A41'),
        ('A42', 'A42'),
        ('A43', 'A43'),
        ('B41', 'B41'),
        ('B42', 'B42'),
        ('B43', 'B43'),
    )
    GENERO_CHOICES = (
        ('Masculino', 'Masculino'),
        ('Femenino', 'Femenino'),
    )
    MODALIDAD_CHOICES = (
        ('Kata', 'Kata'),
        ('Kumite', 'Kumite'),
    )
    nombre = models.CharField(max_length=10, choices=NOMENCLATURA_CHOICES)
    descripcion = models.CharField(max_length=100)
    genero = models.CharField(max_length=10, choices=GENERO_CHOICES)
    grado = models.CharField(max_length=50)
    modalidad = models.CharField(max_length=10, choices=MODALIDAD_CHOICES)

    def __str__(self):
        return f"{self.descripcion} - {self.genero} - {self.modalidad}"


class DetalleCampeonatoCategoria(models.Model):
    Campeonato = models.ForeignKey(Campeonato, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('Campeonato', 'categoria')
    
class Competidor(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    edad = models.IntegerField()
    genero = models.CharField(max_length=10, choices=(('masculino', 'Masculino'), ('femenino', 'Femenino')))
    dojo = models.ForeignKey(Dojo, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class DetalleCampeonatoCategoriaCompetidor(models.Model):
    categoria_campeonato = models.ForeignKey(DetalleCampeonatoCategoria, on_delete=models.CASCADE)
    competidor = models.ForeignKey(Competidor, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('categoria_campeonato', 'competidor')
    
class Sancion(models.Model):
    competidor = models.ForeignKey(DetalleCampeonatoCategoriaCompetidor, on_delete=models.CASCADE)
    motivo = models.CharField(max_length=255)

    def __str__(self):
        return f"Sancion for {self.competidor}"



class DetalleCategoriaCompetidor(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    competidor = models.ForeignKey(Competidor, on_delete=models.CASCADE) 
    class Meta:
        unique_together = ('categoria', 'competidor')
        
    def __str__(self):
        return f"{self.categoria} - {self.competidor}"

# de aca para abajo talvez no se use     

    
# class Ronda(models.Model):
#     nombre = models.CharField(max_length=100)
#     fecha = models.DateField()
#     ronda = models.ForeignKey(DetalleCategoriaCompetidor, on_delete=models.CASCADE)

    
#     def __str__(self):
#         return self.nombre
    

# class Combate(models.Model):
#     ronda = models.ForeignKey(Ronda, on_delete=models.CASCADE)
#     competidor = models.ForeignKey(Competidor, on_delete=models.CASCADE, related_name='combates')
#     ganador = models.BooleanField()
#     puntos = models.IntegerField()
#     faltas1 = models.IntegerField()

#     def __str__(self):
#         return f"Combate {self.id} - Ronda {self.ronda}"

   
    
# class Medallero(models.Model):
#     oro = models.IntegerField()
#     plata = models.IntegerField()
#     bronce = models.IntegerField()
#     ronda = models.ForeignKey(Ronda, on_delete=models.CASCADE)

#     def __str__(self):
#         return f"Medallero - Ronda {self.ronda}"
    
 