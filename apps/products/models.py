from django.db import models
from ..catalog.models import Catalog



class Product(models.Model):
    name = models.TextField(unique=True, max_length=100) # without max_length there will be mysql migrate error 1170
    price_default = models.IntegerField()

    catalog = models.ForeignKey(
        Catalog,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name

    def catalog_text(self):
        return str(self.catalog)
