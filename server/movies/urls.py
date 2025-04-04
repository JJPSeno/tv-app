from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import MovieListCreate, MovieDetail

urlpatterns = [
    path('movies/', MovieListCreate.as_view(), name='movie-list-create'),
    path('movies/<int:pk>/', MovieDetail.as_view(), name='movie-detail'),
]
