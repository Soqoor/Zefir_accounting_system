from django.db import models
from ..products.models import Product


class Order(models.Model):
    date_created = models.DateField(auto_now_add=True)
    date_planed = models.DateField()  # planned date of sending the order
    date_deadline = models.DateField(blank=True, null=True)  # customer deadline
    instagram = models.CharField(max_length=30)  # client instagram id
    phone = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=30, blank=True)
    city = models.CharField(max_length=30, blank=True)
    np_department = models.IntegerField(blank=True, null=True)  # NovaPoshta department number
    is_payed = models.BooleanField(default=False)
    date_payed = models.DateField(blank=True, null=True)
    is_sent = models.BooleanField(default=False)
    date_sent = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ['-date_planed']

    def __str__(self):
        return str(self.instagram) + ' / ' + self.date_planed.strftime('%d.%m.%y')
    

class OrderItem(models.Model):
    product = models.ForeignKey(
        Product,
        related_name='orderitems',
        on_delete=models.CASCADE,
    )
    order = models.ForeignKey(
        Order,
        related_name='orderitems',
        on_delete=models.CASCADE,
    )
    description = models.TextField(blank=True)
    amount = models.IntegerField()
    price = models.IntegerField()
    is_ready = models.BooleanField(default=False)

    class Meta:
        ordering = ['product']

    def __str__(self):
        return f'{self.product} - {self.amount}шт.'

    def product_text(self):
        return str(self.product)

    def catalog_text(self):
        return str(self.product.catalog)