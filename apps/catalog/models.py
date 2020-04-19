from django.db import models


class Catalog(models.Model):
    category = models.TextField()

    def __str__(self):
        return self.category
