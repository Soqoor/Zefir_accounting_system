from django.db import models
from ..products.models import Product


class Order(models.Model):
    date_created = models.DateField()
    date_planed = models.DateField()  # planned date of sending the order
    date_deadline = models.DateField()  # customer deadline
    instagram = models.CharField(max_length=20)  # client instagram id
    phone = models.IntegerField()
    name = models.CharField(max_length=20)
    city = models.CharField(max_length=20)
    np_department = models.IntegerField()  # NovaPoshta department number
    is_payed = models.BooleanField(default=False)
    date_payed = models.DateField(blank=True, null=True)
    is_sent = models.BooleanField(default=False)
    date_sent = models.DateField(blank=True, null=True)

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
        unique_together = ['order', 'product']
        ordering = ['product']

    def __str__(self):
        return f'{self.product} - {self.amount}шт.'
