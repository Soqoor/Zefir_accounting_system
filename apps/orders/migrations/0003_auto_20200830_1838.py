# Generated by Django 3.0.5 on 2020-08-30 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_auto_20200830_1325'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='date_deadline',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='np_department',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='phone',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
