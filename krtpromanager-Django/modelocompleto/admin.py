from django.contrib import admin
from .models import Campeonato, Categoria, Detallecampeonatocategoria, Competidor, Sancion, Usuario,Dojo,Detallecategoriacompetidor,Detallecampeonatocategoriacompetidor

admin.site.register(Campeonato)
admin.site.register(Dojo)
admin.site.register(Categoria)
admin.site.register(Detallecampeonatocategoria)
admin.site.register(Competidor)
admin.site.register(Sancion)
admin.site.register(Usuario)
admin.site.register(Detallecategoriacompetidor)
admin.site.register(Detallecampeonatocategoriacompetidor)
