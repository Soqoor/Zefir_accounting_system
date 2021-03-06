from django.db import models
from datetime import date


class ExpensesCategory(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return str(self.name)


class Expenses(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    date = models.DateField(default=date.today)
    name = models.CharField(max_length=50)
    value = models.IntegerField()
    category = models.ForeignKey(
        ExpensesCategory,
        related_name='expenses',
        on_delete=models.PROTECT,
    )

    class Meta:
        ordering = ['-date', '-created']

    def __str__(self):
        return f'{self.date} {self.name} {self.value}'
