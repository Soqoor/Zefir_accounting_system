# Generated by Django 3.0.5 on 2020-08-30 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='city',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='order',
            name='date_created',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='date_deadline',
            field=models.DateField(blank=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='instagram',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='order',
            name='name',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='order',
            name='np_department',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='phone',
            field=models.IntegerField(blank=True),
        ),
    ]
