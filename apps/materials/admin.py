from django.contrib import admin
from .models import Material, MaterialPrices, MaterialConsumption

admin.site.register(Material)
admin.site.register(MaterialPrices)
admin.site.register(MaterialConsumption)
