from django.db import models
from ..products.models import Product
from django.utils import timezone


class Material(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class MaterialConsumption(models.Model):

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
    )

    material = models.ForeignKey(
        Material,
        on_delete=models.CASCADE,
    )

    consumption = models.FloatField(max_length=20)

    def __str__(self):
        return str(self.product) + ' / ' + str(self.material)


class MaterialPrices(models.Model):
    material = models.ForeignKey(
        Material,
        on_delete=models.CASCADE,
    )
    price = models.FloatField(max_length=20)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.date.strftime('%d.%m.%y') + ' / ' + str(self.material)
