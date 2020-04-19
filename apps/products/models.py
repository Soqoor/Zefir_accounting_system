from django.db import models
from ..catalog.models import Catalog


class Product(models.Model):
    name = models.TextField()
    price_default = models.IntegerField()

    catalog = models.ForeignKey(
        Catalog,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name