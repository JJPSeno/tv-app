from rest_framework import status
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from .models import Movie
from .serializers import MovieSerializer


class CustomPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = None
    max_page_size = 5


class MovieListCreate(APIView):
    pagination_class = CustomPagination

    def get(self, request):
        movies = Movie.objects.all()
        paginator = self.pagination_class()
        paginated_movies = paginator.paginate_queryset(movies, request)
        serializer = MovieSerializer(paginated_movies, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    def post(self, request):
        serializer = MovieSerializer(data=request.data)
        try:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except serializers.ValidationError as e:
            return Response({
                'error': 'Upload Failed',
                'details': e.detail
            }, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({
                'error': 'Unexpected Error',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MovieDetail(APIView):
    def get_object(self, pk):
        return get_object_or_404(Movie, pk=pk)
        
    def get(self, request, pk):
        movie = self.get_object(pk)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)
    
    def patch(self, request, pk):
        movie = self.get_object(pk)
        serializer = MovieSerializer(movie, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        movie = self.get_object(pk)
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)