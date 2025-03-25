from rest_framework import serializers
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'movie_file', 'date_added']
        read_only_fields = ['date_added']  # This field is set automatically