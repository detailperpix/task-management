from django.db import models

# Create your models here.
class Task(models.Model):
    name = models.CharField(max_length=48)
    description = models.CharField(max_length=128)
    startTime = models.DateTimeField(auto_now_add=True)
    endTime = models.DateTimeField(blank=True, null=True)