# Generated by Django 3.0.5 on 2020-08-30 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='name',
            field=models.TextField(unique=True),
        ),
    ]
