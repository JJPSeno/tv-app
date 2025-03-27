from django.utils.html import strip_tags
from rest_framework import serializers
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'movie_file', 'date_added']
        read_only_fields = ['date_added']

    def validate_title(self, value):
        return strip_tags(value)

    def validate_description(self, value):
        return strip_tags(value)

    def validate_movie_file(self, file):
        ext = file.name.split('.')[-1].lower()
        content_type = file.content_type.lower()
        ALLOWED_EXTENTIONS = ['mp4', 'webm']
        ALLOWED_MIME_TYPES = [
            'video/mp4', 
            'video/webm'
        ]

        if ext not in ALLOWED_EXTENTIONS:
            raise serializers.ValidationError(
                f"Unsupported file type. Only {', '.join(ALLOWED_EXTENTIONS)} are allowed."
            )

        if content_type not in ALLOWED_MIME_TYPES:
            raise serializers.ValidationError(
                f"Unsupported video type. Only MP4 and WebM videos are allowed."
            )

        return file