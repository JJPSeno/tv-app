from django.db import models

from django.db import models
from django.utils import timezone

class Movie(models.Model):
    title = models.CharField(max_length=60)
    description = models.TextField(max_length=400)
    movie_file = models.FileField(upload_to='moviesrc/')
    date_added = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.title