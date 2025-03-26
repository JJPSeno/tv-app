from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from .models import Movie
from .serializers import MovieSerializer


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = None  # Disables ability to change page size
    max_page_size = 10


class MovieListCreate(APIView):
    pagination_class = CustomPagination

    def get(self, request):
        # Get all movies from database
        movies = Movie.objects.all()
        # Serialize the queryset
        paginator = self.pagination_class()
        paginated_movies = paginator.paginate_queryset(movies, request)
        serializer = MovieSerializer(paginated_movies, many=True)
        # Return serialized data in response
        return paginator.get_paginated_response(serializer.data)
    
    def post(self, request):
        # Create a new serializer with the request data
        serializer = MovieSerializer(data=request.data)
        # Validate the data
        if serializer.is_valid():
            # Save the new movie
            serializer.save()
            # Return the newly created movie with 201 status code
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Return errors if validation fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MovieDetail(APIView):
    """
    GET, PATCH, and DELETE individual movies
    """
    def get_object(self, pk):
        # Helper method to get movie by ID or return 404
        return get_object_or_404(Movie, pk=pk)
        
    def get(self, request, pk):
        # Get the movie by ID
        movie = self.get_object(pk)
        # Serialize the movie
        serializer = MovieSerializer(movie)
        # Return the serialized movie
        return Response(serializer.data)
    
    def patch(self, request, pk):
        # Get the movie by ID
        movie = self.get_object(pk)
        # Create serializer with the movie and the request data
        # partial=True allows for partial updates
        serializer = MovieSerializer(movie, data=request.data, partial=True)
        # Validate the data
        if serializer.is_valid():
            # Save the updated movie
            serializer.save()
            # Return the updated movie
            return Response(serializer.data)
        # Return errors if validation fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        # Get the movie by ID
        movie = self.get_object(pk)
        # Delete the movie
        movie.delete()
        # Return no content status
        return Response(status=status.HTTP_204_NO_CONTENT)