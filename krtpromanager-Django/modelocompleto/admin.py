from django.contrib import admin
from .models import Campeonato, Categoria, DetalleCategoriaCompetidor, Competidor, Sancion, Usuario,Dojo,DetalleCampeonatoCategoria,DetalleCampeonatoCategoriaCompetidor

admin.site.register(Campeonato)
admin.site.register(Dojo)
admin.site.register(Categoria)
admin.site.register(DetalleCategoriaCompetidor)
admin.site.register(Competidor)
admin.site.register(Sancion)
admin.site.register(Usuario)
admin.site.register(DetalleCampeonatoCategoria)
admin.site.register(DetalleCampeonatoCategoriaCompetidor)
