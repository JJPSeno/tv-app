import uuid
import os
from django.db import models
from django.utils import timezone

def generate_unique_filename(instance, filename):
    ext = os.path.splitext(filename)[1]
    new_filename = f"{uuid.uuid4()}{ext}"
    return os.path.join('moviesrc', new_filename)

class Movie(models.Model):
    title = models.CharField(max_length=60)
    description = models.TextField(max_length=400, blank=True, null=True)
    movie_file = models.FileField(upload_to=generate_unique_filename)
    date_added = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.title